import { useEffect } from 'react';
import { ago } from '../utils';

export default function ArticleModal({ article, onClose }) {
  const isWaiting = article.status === 'pending' || article.status === 'loading';
  const content   = article.full || article.summary || article.trail;

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 flex-wrap">
            <span className="font-semibold text-slate-600">The Guardian</span>
            {article.section && <><span>·</span><span>{article.section}</span></>}
            <span>·</span>
            <span>{ago(article.published)}</span>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition ml-3 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto modal-body px-5 py-5">
          <h2 className="font-extrabold text-xl text-slate-900 leading-snug mb-5">{article.titleIS || article.title}</h2>
          {isWaiting ? (
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`shimmer h-4 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
              ))}
              <p className="text-xs text-slate-400 mt-3 text-center">Þýði grein…</p>
            </div>
          ) : (
            <div className="space-y-3">
              {content.split('\n').filter(p => p.trim()).map((p, i) => (
                <p key={i} className="text-slate-600 text-sm leading-relaxed">{p}</p>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-2xl">
          <p className="text-xs text-slate-400">Simplified by AI · original may differ</p>
          <a
            href={article.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
          >
            Read original
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
