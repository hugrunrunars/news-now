import { C } from '../constants';

export default function TagPill({ tag, active, newCount, onClick, onRemove }) {
  const style = C[tag.color] || C.blue;
  return (
    <div className="shrink-0 group flex items-center gap-0.5">
      <button
        onClick={onClick}
        className={`relative text-sm font-semibold px-3.5 py-1.5 rounded-full transition-all ${
          active ? style.active : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700'
        }`}
      >
        {tag.name}
        {newCount > 0 && !active && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-white bg-red-500 rounded-full shadow-sm leading-none">
            {newCount > 99 ? '99+' : newCount}
          </span>
        )}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onRemove(tag.id); }}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-400 w-4 h-4 flex items-center justify-center rounded-full text-xs leading-none"
        title="Fjarlægja flokk"
      >
        ✕
      </button>
    </div>
  );
}
