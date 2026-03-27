import { Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  year: number;
  className?: string;
  onClick: () => void;
}

export function MovieCard({
  title,
  imageUrl,
  rating,
  year,
  className,
  onClick,
}: MovieCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-3 w-45 shrink-0 sm:w-60 cursor-pointer focus-visible:ring-1 focus-visible:ring-white group select-none ${className || "w-45 sm:w-55"}`}
      aria-label={`Ver detalhes de ${title}`}
    >
      <div className="overflow-hidden rounded-2xl aspect-2/3 bg-slate-800 hover:shadow-xl">
        <img
          src={imageUrl}
          alt={title}
          draggable={false}
          className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div>
        <div className="flex flex-col w-full overflow-hidden">
          <h4
            className="font-semibold text-sm text-white truncate group-hover:text-white/80 transition-colors"
            title={title}
          >
            {title}
          </h4>

          <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-white/80 text-white/80" />
              {rating.toFixed(1)}
            </span>
            <span>|</span>
            <span>{year}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
