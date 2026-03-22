import HeroCardItem from "./HeroCardItem";
import type { Movie } from "./MovieList";

interface HeroSectionProps {
  movies: Movie[];
}

const HeroSection = ({ movies }: HeroSectionProps) => {
  if (!movies || movies.length === 0) return null;

  const firstMovie = movies[0];
  const secondMovie = movies[1];

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
      <HeroCardItem
        className="md:col-span-2"
        title={firstMovie.title}
        imageUrl={firstMovie.imageUrl}
      />

      <HeroCardItem
        className="md:col-span-3"
        title={secondMovie.title}
        imageUrl={secondMovie.imageUrl}
      />
    </section>
  );
};

export default HeroSection;
