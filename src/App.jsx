import { useState, useEffect, useCallback, useRef } from 'react';
import { LS, PRESET_TAGS, COLOR_POOL } from './constants';
import { getCache, getSeen, markSeen } from './utils';
import { fetchTag, rewriteArticle } from './api';
import SetupScreen from './components/SetupScreen';
import TagPill from './components/TagPill';
import Skeleton from './components/Skeleton';
import FeaturedCard from './components/FeaturedCard';
import Card from './components/Card';
import ArticleModal from './components/ArticleModal';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [ready, setReady] = useState(
    !!(localStorage.getItem(LS.G_KEY) && localStorage.getItem(LS.AI_KEY))
  );
  const [tags, setTags] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS.TAGS)) || PRESET_TAGS; }
    catch { return PRESET_TAGS; }
  });
  const [active, setActive] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS.ACTIVE));
      if (saved !== null) return saved;
      return PRESET_TAGS.slice(0, 2).map(t => t.id);
    } catch { return PRESET_TAGS.slice(0, 2).map(t => t.id); }
  });
  const [articles,     setArticles]     = useState([]);
  const [fetching,     setFetching]     = useState(false);
  const [error,        setError]        = useState('');
  const [openArticle,  setOpenArticle]  = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [tagInput,     setTagInput]     = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [newCounts,  setNewCounts]  = useState({});
  const [translationProgress, setTranslationProgress] = useState({
    current: 0, total: 0, activeIds: [], queuedIds: [], completedTimes: [],
  });

  const runRef = useRef(0);

  /* ── Load news + background rewrites ─────────────────────────── */
  const loadNews = useCallback(async () => {
    if (!active.length) return;
    const gKey  = localStorage.getItem(LS.G_KEY);
    const aiKey = localStorage.getItem(LS.AI_KEY);
    const myRun = ++runRef.current;

    setFetching(true);
    setError('');
    setArticles([]);
    setOpenArticle(null);

    try {
      const activeTags = tags.filter(t => active.includes(t.id));
      const results    = await Promise.all(activeTags.map(t => fetchTag(t, gKey)));
      if (myRun !== runRef.current) return;

      const dedup = new Set();
      const cache = getCache();
      const all   = results.flat()
        .filter(a => { if (dedup.has(a.id)) return false; dedup.add(a.id); return true; })
        .sort((a, b) => new Date(b.published) - new Date(a.published))
        .map(a => cache[a.id] ? { ...a, ...cache[a.id], status: 'done' } : a);

      if (myRun !== runRef.current) return;
      setFetching(false);
      setArticles(all);

      /* ── Track new article counts per tag ── */
      const seen = getSeen();
      const counts = {};
      for (const t of activeTags) {
        const tagArticles = all.filter(a => a.tagId === t.id);
        const ids = tagArticles.map(a => a.id);
        const prevIds = new Set(seen[t.id] || []);
        const newCount = ids.filter(id => !prevIds.has(id)).length;
        if (newCount > 0) counts[t.id] = newCount;
        markSeen(t.id, ids);
      }
      setNewCounts(prev => ({ ...prev, ...counts }));

      /* ── Rewrite queue (sequential, rate-limit safe) ── */
      const toRewrite = all.filter(a => a.status === 'pending');
      let delay = 4000;
      let consecutiveErrors = 0;
      const completedTimes = [];

      setTranslationProgress({
        current: 0, total: toRewrite.length, activeIds: [], queuedIds: toRewrite.map(a => a.id), completedTimes: [],
      });

      for (let i = 0; i < toRewrite.length; i++) {
        if (myRun !== runRef.current) return;
        const art = toRewrite[i];

        setArticles(prev => prev.map(a =>
          a.id === art.id ? { ...a, status: 'loading' } : a
        ));
        setTranslationProgress(prev => ({
          ...prev,
          current: i,
          activeIds: [art.id],
          queuedIds: toRewrite.slice(i + 1).map(a => a.id),
        }));

        const artStart = Date.now();
        try {
          const r = await rewriteArticle(art, aiKey);
          if (myRun !== runRef.current) return;
          const artDuration = Date.now() - artStart;
          completedTimes.push(artDuration);
          consecutiveErrors = 0;
          setArticles(prev => prev.map(a =>
            a.id === art.id ? { ...a, titleIS: r.titleIS, summary: r.summary, full: r.full, status: 'done' } : a
          ));
          setTranslationProgress(prev => ({
            ...prev, completedTimes: [...prev.completedTimes, artDuration],
          }));
          if (completedTimes.length >= 3) delay = Math.max(2000, Math.floor(delay * 0.85));
        } catch (err) {
          console.error('Rewrite failed for', art.id, err);
          consecutiveErrors++;
          if (myRun !== runRef.current) return;
          setArticles(prev => prev.map(a =>
            a.id === art.id ? { ...a, status: 'error' } : a
          ));
          delay = Math.min(15000, delay * 2);
        }

        if (i + 1 < toRewrite.length) await new Promise(r => setTimeout(r, delay));
      }

      setTranslationProgress(prev => ({
        ...prev, current: prev.total, activeIds: [], queuedIds: [],
      }));
    } catch (e) {
      if (myRun !== runRef.current) return;
      setFetching(false);
      setError(e.message);
    }
  }, [active, tags]);

  /* ── Sync open article when rewrite arrives ─────────────────── */
  useEffect(() => {
    if (!openArticle) return;
    const updated = articles.find(a => a.id === openArticle.id);
    if (updated && updated.status !== openArticle.status) setOpenArticle(updated);
  }, [articles]);

  /* ── Auto-load on tag change ─────────────────────────────────── */
  useEffect(() => {
    if (ready) loadNews();
  }, [ready, active.join(',')]);

  /* ── Background check for new articles on inactive tags ─────── */
  useEffect(() => {
    if (!ready) return;
    const gKey = localStorage.getItem(LS.G_KEY);
    if (!gKey) return;
    const inactiveTags = tags.filter(t => !active.includes(t.id));
    if (!inactiveTags.length) return;

    let cancelled = false;
    (async () => {
      const seen = getSeen();
      const counts = {};
      for (const t of inactiveTags) {
        if (cancelled) return;
        try {
          const articles = await fetchTag(t, gKey);
          const ids = articles.map(a => a.id);
          const prevIds = new Set(seen[t.id] || []);
          const newCount = ids.filter(id => !prevIds.has(id)).length;
          if (newCount > 0) counts[t.id] = newCount;
        } catch { /* ignore background check failures */ }
      }
      if (!cancelled) setNewCounts(prev => ({ ...prev, ...counts }));
    })();

    return () => { cancelled = true; };
  }, [ready, active.join(','), tags]);

  /* ── Clear new count when a tag becomes active ─────────────── */
  const toggleTag = id => {
    if (!active.includes(id)) {
      setNewCounts(prev => { const n = { ...prev }; delete n[id]; return n; });
    }
    setActive(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  };

  /* ── Persist prefs ───────────────────────────────────────────── */
  useEffect(() => { localStorage.setItem(LS.ACTIVE, JSON.stringify(active)); }, [active]);
  useEffect(() => { localStorage.setItem(LS.TAGS,   JSON.stringify(tags));   }, [tags]);

  const allActive  = tags.length > 0 && tags.every(t => active.includes(t.id));
  const toggleAll  = () => { setNewCounts({}); setActive(allActive ? [] : tags.map(t => t.id)); };
  const removeTag  = id => { setTags(p => p.filter(t => t.id !== id)); setActive(p => p.filter(x => x !== id)); };

  const addTag = () => {
    const name = tagInput.trim();
    if (!name) return;
    const id    = name.toLowerCase().replace(/\s+/g, '-');
    if (tags.find(t => t.id === id)) return;
    const color = COLOR_POOL[tags.length % COLOR_POOL.length];
    setTags(p => [...p, { id, name, color, query: name }]);
    setActive(p => [...p, id]);
    setTagInput('');
    setShowTagInput(false);
  };

  /* ── Retry single article ──────────────────────────────────── */
  const retryArticle = useCallback(async (articleId) => {
    const aiKey = localStorage.getItem(LS.AI_KEY);
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    setArticles(prev => prev.map(a =>
      a.id === articleId ? { ...a, status: 'loading' } : a
    ));

    try {
      const r = await rewriteArticle(article, aiKey);
      setArticles(prev => prev.map(a =>
        a.id === articleId ? { ...a, titleIS: r.titleIS, summary: r.summary, full: r.full, status: 'done' } : a
      ));
    } catch (err) {
      console.error('Manual retry failed for', articleId, err);
      setArticles(prev => prev.map(a =>
        a.id === articleId ? { ...a, status: 'error' } : a
      ));
    }
  }, [articles]);

  /* ── Progress ────────────────────────────────────────────────── */
  const done    = articles.filter(a => a.status === 'done').length;
  const total   = articles.length;
  const rewriting = total > 0 && done < total;

  const avgTime = translationProgress.completedTimes.length > 0
    ? translationProgress.completedTimes.reduce((a, b) => a + b, 0) / translationProgress.completedTimes.length
    : null;
  const remaining = total - done;
  const etaMs = avgTime && remaining > 0 ? remaining * avgTime : null;
  const etaText = etaMs
    ? etaMs > 60000
      ? `~${Math.ceil(etaMs / 60000)} mín eftir`
      : `~${Math.ceil(etaMs / 1000)} sek eftir`
    : null;

  if (!ready) return <SetupScreen onDone={() => setReady(true)} />;

  return (
    <div className="min-h-screen bg-[#FAF3EC]">

      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="bg-[#3A5615] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📰</span>
            <div>
              <span className="font-serif text-[#FAF3EC] font-bold text-lg tracking-tight">Fréttir</span>
              {rewriting && (
                <span className="ml-2 text-xs text-[rgba(250,243,236,0.55)]">
                  Þýði {done}/{total}…
                  {etaText && <span className="ml-1.5 text-[rgba(250,243,236,0.35)]">{etaText}</span>}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              onClick={loadNews} disabled={fetching}
              title="Endurhlaða"
              className="p-2 rounded-lg text-[rgba(250,243,236,0.55)] hover:text-[#FAF3EC] hover:bg-[rgba(250,243,236,0.1)] transition disabled:opacity-40"
            >
              <svg className={`w-5 h-5 ${fetching ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              title="Stillingar"
              className="p-2 rounded-lg text-[rgba(250,243,236,0.55)] hover:text-[#FAF3EC] hover:bg-[rgba(250,243,236,0.1)] transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Tag bar ─────────────────────────────────────────────── */}
      <div className="sticky top-14 z-30 bg-[#FAF3EC]/90 backdrop-blur-md border-b border-[rgba(58,86,21,0.08)]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="tag-bar flex items-center gap-2 overflow-x-auto py-3">
            <button
              onClick={toggleAll}
              className={`shrink-0 text-sm font-bold px-3.5 py-1.5 rounded-full transition ${allActive ? 'bg-[#3A5615] text-[#FAF3EC]' : 'bg-white text-[rgba(58,86,21,0.5)] border border-[rgba(58,86,21,0.12)] hover:border-[rgba(58,86,21,0.25)]'}`}
            >
              Allt
            </button>
            {tags.map(t => (
              <TagPill key={t.id} tag={t} active={active.includes(t.id)} newCount={newCounts[t.id] || 0} onClick={() => toggleTag(t.id)} onRemove={removeTag} />
            ))}

            {showTagInput ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  autoFocus
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter')  addTag();
                    if (e.key === 'Escape') setShowTagInput(false);
                  }}
                  placeholder="Heiti flokks…"
                  className="border border-[rgba(58,86,21,0.2)] rounded-full px-3.5 py-1.5 text-sm w-32 text-[#3A5615] bg-white placeholder-[rgba(58,86,21,0.3)] focus:outline-none focus:ring-2 focus:ring-[#ACC653]"
                />
                <button onClick={addTag} className="text-xs font-bold text-[#3A5615] hover:text-[#5a7a1a] px-1">Bæta við</button>
                <button onClick={() => setShowTagInput(false)} className="text-xs text-[rgba(58,86,21,0.3)] hover:text-[#3A5615] px-1">✕</button>
              </div>
            ) : (
              <button
                onClick={() => setShowTagInput(true)}
                className="shrink-0 text-sm px-3.5 py-1.5 rounded-full border border-dashed border-[rgba(58,86,21,0.2)] text-[rgba(58,86,21,0.4)] hover:border-[rgba(58,86,21,0.4)] hover:text-[#3A5615] font-bold transition"
              >
                + Bæta við
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-6">

        {error && (
          <div className="bg-[rgba(237,166,191,0.12)] border border-[rgba(237,166,191,0.4)] rounded-xl px-4 py-3 mb-5 text-sm text-[#b05080]">
            <strong>Villa:</strong> {error}
          </div>
        )}

        {!active.length ? (
          <div className="text-center py-24 text-[rgba(58,86,21,0.4)]">
            <div className="text-5xl mb-4">🗂️</div>
            <p className="font-bold text-[#3A5615] text-base">Ekkert efni valið</p>
            <p className="text-sm mt-1">Veldu flokk hér að ofan til að byrja að lesa</p>
          </div>
        ) : fetching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : !articles.length ? (
          <div className="text-center py-24 text-[rgba(58,86,21,0.4)]">
            <p className="text-sm">Engar greinar fundust. Prófaðu önnur efnisflokk.</p>
          </div>
        ) : (
          <>
            <FeaturedCard article={articles[0]} tags={tags} onOpen={setOpenArticle} onRetry={retryArticle} />
            {articles.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.slice(1).map(a => (
                  <Card key={a.id} article={a} tags={tags} onOpen={setOpenArticle} onRetry={retryArticle} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Modals ──────────────────────────────────────────────── */}
      {openArticle  && <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} onRefresh={loadNews} />}
    </div>
  );
}
