export default function Skeleton() {
  return (
    <div className="bg-white border border-[rgba(58,86,21,0.08)] rounded-2xl overflow-hidden">
      <div className="shimmer h-40 w-full" />
      <div className="p-5 space-y-3">
        <div className="shimmer h-5 w-20 rounded-full" />
        <div className="space-y-2">
          <div className="shimmer h-4 w-full rounded-lg" />
          <div className="shimmer h-4 w-4/5 rounded-lg" />
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="shimmer h-3.5 w-full rounded" />
          <div className="shimmer h-3.5 w-full rounded" />
          <div className="shimmer h-3.5 w-3/4 rounded" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-[rgba(58,86,21,0.08)]">
          <div className="shimmer h-3 w-20 rounded" />
          <div className="shimmer h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}
