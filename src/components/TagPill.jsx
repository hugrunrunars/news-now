import { C } from '../constants';

export default function TagPill({ tag, active, newCount, onClick, onRemove }) {
  const style = C[tag.color] || C.forest;
  return (
    <div className="shrink-0 group flex items-center gap-0.5">
      <button
        onClick={onClick}
        className={`relative text-sm font-bold px-3.5 py-1.5 rounded-full transition-all ${
          active ? style.active : 'bg-white text-[rgba(58,86,21,0.5)] border border-[rgba(58,86,21,0.12)] hover:border-[rgba(58,86,21,0.25)] hover:text-[#3A5615]'
        }`}
      >
        {tag.name}
        {newCount > 0 && !active && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold text-[#3A5615] bg-[#ACC653] rounded-full shadow-sm leading-none">
            {newCount > 99 ? '99+' : newCount}
          </span>
        )}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onRemove(tag.id); }}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[rgba(58,86,21,0.25)] hover:text-[#b05080] w-4 h-4 flex items-center justify-center rounded-full text-xs leading-none"
        title="Fjarlægja flokk"
      >
        ✕
      </button>
    </div>
  );
}
