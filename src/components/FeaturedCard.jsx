import { C } from '../constants';
import { ago } from '../utils';

export default function FeaturedCard({ article, tags, onOpen, onRetry }) {
  const tag    = tags.find(t => t.id === article.tagId) || { color: 'forest', name: article.tagName };
  const style  = C[tag.color] || C.forest;
  const isLoading = article.status === 'loading';
  const isError   = article.status === 'error';
  const text   = article.summary || article.trail;

  return (
    <div className="bg-white border border-[rgba(58,86,21,0.08)] rounded-2xl hover:shadow-md transition-shadow duration-200 card-enter overflow-hidden mb-6">
      <div className="flex flex-col sm:flex-row">
        {article.thumbnail && (
          <div className="sm:w-1/2 h-56 sm:h-auto shrink-0">
            <img src={article.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        )}

        <div className="flex-1 p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${style.chip}`}>{article.tagName}</span>
            {article.section && (
              <span className="text-[10px] text-[rgba(58,86,21,0.4)]">{article.section}</span>
            )}
            <span className="text-[10px] font-bold text-[rgba(58,86,21,0.4)] bg-[rgba(58,86,21,0.06)] px-2 py-0.5 rounded-full uppercase tracking-wider">Nýjast</span>
            {isError && (
              <span className="flex items-center gap-1.5">
                <span className="text-xs text-[#b05080] font-medium">⚠ Þýðing mistókst</span>
                <button
                  onClick={e => { e.stopPropagation(); onRetry(article.id); }}
                  className="text-xs font-medium text-[#3A5615] hover:text-[#5a7a1a] underline"
                >Reyna aftur</button>
              </span>
            )}
          </div>

          <h2 className="font-serif font-bold text-[#3A5615] text-xl sm:text-2xl leading-snug mb-4">{article.titleIS || article.title}</h2>

          <div className="flex-1 mb-5">
            {isLoading ? (
              <div className="space-y-2">
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer h-4 w-3/4 rounded" />
                <p className="text-xs text-[#ACC653] mt-1">Þýði…</p>
              </div>
            ) : (
              <p className="text-[rgba(58,86,21,0.55)] text-base leading-relaxed">{text || article.trail}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[rgba(58,86,21,0.08)]">
            <span className="font-mono text-[11px] text-[rgba(58,86,21,0.35)]">{ago(article.published)}</span>
            <button
              onClick={() => onOpen(article)}
              className="text-sm font-bold bg-[#3A5615] hover:bg-[#4a6b1e] text-[#FAF3EC] px-5 py-2 rounded-full transition"
            >
              Lesa meira →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
