import { useState } from 'react';
import { LS } from '../constants';

export default function SettingsModal({ onClose, onRefresh }) {
  const [gKey,    setGKey]    = useState(localStorage.getItem(LS.G_KEY)  || '');
  const [aiKey,   setAiKey]   = useState(localStorage.getItem(LS.AI_KEY) || '');
  const [cleared, setCleared] = useState(false);

  const save = () => {
    localStorage.setItem(LS.G_KEY,  gKey);
    localStorage.setItem(LS.AI_KEY, aiKey);
    onRefresh();
    onClose();
  };

  const clearCache = () => {
    localStorage.removeItem(LS.CACHE);
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Stillingar</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Guardian lykill</label>
            <input
              type="password" value={gKey} onChange={e => setGKey(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Gemini lykill</label>
            <input
              type="password" value={aiKey} onChange={e => setAiKey(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={clearCache}
              className="flex-1 text-sm border border-slate-200 text-slate-600 py-2.5 rounded-xl hover:bg-slate-50 font-medium transition"
            >
              {cleared ? '✓ Hreinsað!' : 'Hreinsa skyndiminni'}
            </button>
            <button
              onClick={save}
              className="flex-1 text-sm bg-slate-900 hover:bg-slate-700 text-white py-2.5 rounded-xl font-bold transition"
            >
              Vista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
