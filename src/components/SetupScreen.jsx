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
    <div className="min-h-screen bg-[#3A5615] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(172,198,83,0.2)] mb-4 text-3xl">📰</div>
          <h1 className="font-serif text-4xl font-bold text-[#FAF3EC] tracking-tight">Fréttir</h1>
          <p className="text-[rgba(250,243,236,0.55)] mt-2 text-sm">Heimsfréttir á einfalda íslensku</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-[rgba(58,86,21,0.5)] uppercase tracking-widest mb-2">Guardian API lykill</label>
            <input
              type="password" value={gKey} onChange={e => setGKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Límdu lykilinn hér"
              className="w-full border border-[rgba(58,86,21,0.12)] rounded-xl px-4 py-2.5 text-sm text-[#3A5615] placeholder-[rgba(58,86,21,0.3)] focus:outline-none focus:ring-2 focus:ring-[#ACC653] transition"
            />
            <p className="text-xs text-[rgba(58,86,21,0.4)] mt-1.5">
              Ókeypis lykill →{' '}
              <a href="https://open-platform.theguardian.com/access/" target="_blank" rel="noopener noreferrer" className="text-[#3A5615] hover:underline font-medium">
                open-platform.theguardian.com
              </a>
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[rgba(58,86,21,0.5)] uppercase tracking-widest mb-2">Gemini API lykill</label>
            <input
              type="password" value={aiKey} onChange={e => setAiKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="Límdu lykilinn hér"
              className="w-full border border-[rgba(58,86,21,0.12)] rounded-xl px-4 py-2.5 text-sm text-[#3A5615] placeholder-[rgba(58,86,21,0.3)] focus:outline-none focus:ring-2 focus:ring-[#ACC653] transition"
            />
            <p className="text-xs text-[rgba(58,86,21,0.4)] mt-1.5">
              Ókeypis lykill →{' '}
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-[#3A5615] hover:underline font-medium">
                aistudio.google.com
              </a>
            </p>
          </div>

          {err && (
            <div className="bg-[rgba(237,166,191,0.12)] text-[#b05080] text-xs rounded-xl px-4 py-2.5 border border-[rgba(237,166,191,0.4)]">{err}</div>
          )}

          <button
            onClick={submit} disabled={!gKey || !aiKey || loading}
            className="w-full bg-[#3A5615] hover:bg-[#4a6b1e] disabled:bg-[rgba(58,86,21,0.08)] disabled:text-[rgba(58,86,21,0.3)] text-[#FAF3EC] font-bold py-3 rounded-xl transition text-sm"
          >
            {loading ? 'Athuga lykla…' : 'Byrja að lesa →'}
          </button>
        </div>
      </div>
    </div>
  );
}
