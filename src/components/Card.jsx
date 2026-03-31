import { C } from '../constants';
import { ago } from '../utils';

export default function Card({ article, tags, onOpen, onRetry }) {
  const tag    = tags.find(t => t.id === article.tagId) || { color: 'blue', name: article.tagName };
  const style  = C[tag.color] || C.blue;
  const isLoading = article.status === 'loading';
  const isError   = article.status === 'error';
  const text   = article.summary || article.trail;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col card-enter overflow-hidden">
      {article.thumbnail && (
        <div className="w-full h-40 bg-slate-100">
          <img src={article.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.chip}`}>{article.tagName}</span>
          {article.section && (
            <span className="text-xs text-slate-400 truncate max-w-[120px]">{article.section}</span>
          )}
          {isError && (
            <span className="flex items-center gap-1.5">
              <span className="text-xs text-amber-500 font-medium">⚠ Þýðing mistókst</span>
              <button
                onClick={e => { e.stopPropagation(); onRetry(article.id); }}
                className="text-xs font-medium text-blue-500 hover:text-blue-700 underline"
              >Reyna aftur</button>
            </span>
          )}
        </div>

        <h2 className="font-semibold text-slate-900 text-sm leading-snug mb-3 lc3">{article.titleIS || article.title}</h2>

        <div className="flex-1 min-h-[56px] mb-4">
          {isLoading ? (
            <div className="space-y-1.5">
              <div className="shimmer h-3.5 w-full rounded" />
              <div className="shimmer h-3.5 w-full rounded" />
              <div className="shimmer h-3.5 w-3/4 rounded" />
              <p className="text-xs text-blue-400 mt-1">Þýði…</p>
            </div>
          ) : (
            <p className="text-slate-500 text-sm leading-relaxed lc4">{text || article.trail}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">{ago(article.published)}</span>
          <button
            onClick={() => onOpen(article)}
            className="text-xs font-bold bg-slate-900 hover:bg-slate-700 text-white px-3.5 py-1.5 rounded-xl transition"
          >
            Lesa meira
          </button>
        </div>
      </div>
    </div>
  );
}
