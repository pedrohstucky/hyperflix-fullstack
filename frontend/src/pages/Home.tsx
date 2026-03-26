import { useEffect, useState } from "react";
import CategoryNav from "@/components/CategoryNav";
import HeroSection from "@/components/HeroSection";
import { MovieList, type Movie } from "@/components/MovieList";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/catalog/trending`,
        );

        if (!response.ok) throw new Error("Erro ao buscar filmes no servidor");

        const data = await response.json();

        setTrendingMovies(data);
      } catch (error) {
        console.error("Erro na comunicação com o backend: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  const heroMovies = trendingMovies.slice(-6);
  const listMovies = trendingMovies.slice(0);

  return (
    <div className="min-h-screen text-white font-sans w-full overflow-x-hidden">
      <main className="px-6 md:px-20 pb-12">
        <HeroSection movies={heroMovies} />
        <CategoryNav />

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="text-white/60 font-medium text-lg animate-pulse">
              Carregando catálogo...
            </span>
          </div>
        ) : (
          <MovieList title="Em alta no momento" movies={listMovies} />
        )}
      </main>
    </div>
  );
}

export default Home;
