import { C } from '../constants';
import { ago } from '../utils';

export default function FeaturedCard({ article, tags, onOpen, onRetry }) {
  const tag    = tags.find(t => t.id === article.tagId) || { color: 'blue', name: article.tagName };
  const style  = C[tag.color] || C.blue;
  const isLoading = article.status === 'loading';
  const isError   = article.status === 'error';
  const text   = article.summary || article.trail;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 card-enter overflow-hidden mb-6">
      <div className="flex flex-col sm:flex-row">
        {article.thumbnail && (
          <div className="sm:w-1/2 h-56 sm:h-auto bg-slate-100 shrink-0">
            <img src={article.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        <div className="flex-1 p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.chip}`}>{article.tagName}</span>
            {article.section && (
              <span className="text-xs text-slate-400 truncate max-w-[120px]">{article.section}</span>
            )}
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Nýjast</span>
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

          <h2 className="font-extrabold text-slate-900 text-xl sm:text-2xl leading-snug mb-4">{article.titleIS || article.title}</h2>

          <div className="flex-1 mb-5">
            {isLoading ? (
              <div className="space-y-2">
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-3/4 rounded" />
                <p className="text-xs text-blue-400 mt-1">Þýði…</p>
              </div>
            ) : (
              <p className="text-slate-500 text-base leading-relaxed">{text || article.trail}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-400">{ago(article.published)}</span>
            <button
              onClick={() => onOpen(article)}
              className="text-sm font-bold bg-slate-900 hover:bg-slate-700 text-white px-5 py-2 rounded-xl transition"
            >
              Lesa meira
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
