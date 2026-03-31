import { useState } from 'react';
import { LS } from '../constants';

export default function SetupScreen({ onDone }) {
  const [gKey,    setGKey]    = useState('');
  const [aiKey,   setAiKey]   = useState('');
  const [loading, setLoading] = useState(false);
  const [err,     setErr]     = useState('');

  const submit = async () => {
    if (!gKey.trim() || !aiKey.trim()) return;
    setLoading(true); setErr('');
    try {
      const r = await fetch(`https://content.guardianapis.com/search?api-key=${gKey.trim()}&page-size=1`);
      if (!r.ok) { setErr('Guardian API key looks wrong. Try again.'); setLoading(false); return; }
    } catch {
      setErr('Could not reach the Guardian API. Check your internet connection.'); setLoading(false); return;
    }
    localStorage.setItem(LS.G_KEY,  gKey.trim());
    localStorage.setItem(LS.AI_KEY, aiKey.trim());
    onDone();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-4 text-3xl">📰</div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Fréttir</h1>
          <p className="text-slate-400 mt-2 text-sm">Heimsfréttir á einfalda íslensku</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Guardian API lykill</label>
            <input
              type="password" value={gKey} onChange={e => setGKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Límdu lykilinn hér"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Ókeypis lykill →{' '}
              <a href="https://open-platform.theguardian.com/access/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                open-platform.theguardian.com
              </a>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gemini API lykill</label>
            <input
              type="password" value={aiKey} onChange={e => setAiKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Límdu lykilinn hér"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
            <p className="text-xs text-slate-400 mt-1.5">
              Ókeypis lykill →{' '}
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                aistudio.google.com
              </a>
            </p>
          </div>

          {err && (
            <div className="bg-red-50 text-red-600 text-xs rounded-xl px-4 py-2.5 border border-red-100">{err}</div>
          )}

          <button
            onClick={submit} disabled={!gKey || !aiKey || loading}
            className="w-full bg-slate-900 hover:bg-slate-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-3 rounded-xl transition text-sm"
          >
            {loading ? 'Athuga lykla…' : 'Byrja að lesa →'}
          </button>
        </div>
      </div>
    </div>
  );
}
