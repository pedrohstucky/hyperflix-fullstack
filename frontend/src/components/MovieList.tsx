import React, { useRef } from "react";
import { MovieCard } from "./MovieCard";
import { useNavigate } from "react-router-dom";

export interface Movie {
  id: string | number;
  title: string;
  imageUrl: string;
  rating: number;
  year: number;
  type: string;
}

interface MovieListProps {
  title: string;
  movies: Movie[];
}

export function MovieList({ title, movies }: MovieListProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const navigate = useNavigate();

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (!sliderRef.current) return;

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="flex flex-col gap-6 mt-6 mb-8">
      <h3 className="text-[26px] font-medium text-white/90 px-1">{title}</h3>

      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-4 px-1 cursor-grab active:cursor-grabbing select-none"
      >
        {movies.map((movie) => (
          <MovieCard
            onClick={() =>
              navigate(`/title/${movie.type || "movie"}/${movie.id}`)
            }
            key={movie.id}
            title={movie.title}
            imageUrl={movie.imageUrl}
            rating={movie.rating}
            year={movie.year}
          />
        ))}
      </div>
    </section>
  );
}
