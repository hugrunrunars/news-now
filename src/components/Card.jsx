import { C } from '../constants';
import { ago } from '../utils';

export default function Card({ article, tags, onOpen, onRetry }) {
  const tag    = tags.find(t => t.id === article.tagId) || { color: 'forest', name: article.tagName };
  const style  = C[tag.color] || C.forest;
  const isLoading = article.status === 'loading';
  const isError   = article.status === 'error';
  const text   = article.summary || article.trail;

  return (
    <div className="bg-white border border-[rgba(58,86,21,0.08)] rounded-2xl hover:shadow-md transition-shadow duration-200 flex flex-col card-enter overflow-hidden">
      {article.thumbnail && (
        <div className="w-full h-40">
          <img src={article.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${style.chip}`}>{article.tagName}</span>
          {article.section && (
            <span className="text-[10px] text-[rgba(58,86,21,0.4)]">{article.section}</span>
          )}
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

        <h2 className="font-serif font-bold text-[#3A5615] text-sm leading-snug mb-3 lc3">{article.titleIS || article.title}</h2>

        <div className="flex-1 min-h-[56px] mb-4">
          {isLoading ? (
            <div className="space-y-1.5">
              <div className="shimmer h-3.5 w-full rounded" />
              <div className="shimmer h-3.5 w-full rounded" />
              <div className="shimmer h-3.5 w-3/4 rounded" />
              <p className="text-xs text-[#ACC653] mt-1">Þýði…</p>
            </div>
          ) : (
            <p className="text-[rgba(58,86,21,0.55)] text-[13px] leading-relaxed lc4">{text || article.trail}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[rgba(58,86,21,0.08)]">
          <span className="font-mono text-[11px] text-[rgba(58,86,21,0.35)]">{ago(article.published)}</span>
          <button
            onClick={() => onOpen(article)}
            className="text-[11px] font-bold bg-[#3A5615] hover:bg-[#4a6b1e] text-[#FAF3EC] px-3.5 py-1.5 rounded-full transition"
          >
            Lesa meira →
          </button>
        </div>
      </div>
    </div>
  );
}
