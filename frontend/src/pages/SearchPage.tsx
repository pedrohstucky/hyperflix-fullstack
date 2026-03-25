import { MovieCard } from "@/components/MovieCard";
import type { Movie } from "@/components/MovieList";
import { Button } from "@/components/ui/button";
import { ChevronLeft, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface PageData {
  page: number;
  totalPages: number;
  results: Movie[];
}

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state?.initialData as PageData | undefined;

  // Estados locais da tela
  const [data, setData] = useState<PageData | null>(initialData || null);
  const [isLoading, setIsLoading] = useState<boolean>(!initialData);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (initialData && data === initialData) {
      return;
    }

    const fetchSearch = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/catalog/search?query=${encodeURIComponent(query)}&page=1`,
        );
        if (!response.ok) throw new Error("Erro na API");

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Erro na busca", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();
  }, [query, initialData]);

  const movies = data?.results || [];

  return (
    <div className="min-h-screen text-white font-sans w-full overflow-x-hidden">
      <main className="px-6 md:px-10 pb-12 mt-6 animate-in fade-in duration-500">
        <div className="flex items-center gap-3 mb-8">
          <Button
            onClick={() => navigate("/")}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer shrink-0"
          >
            <ChevronLeft size={24} className="text-white" />
          </Button>
          <div className="bg-black px-6 py-2 rounded-full max-w-full overflow-hidden">
            <h2 className="text-lg md:text-lg font-bold text-white truncate">
              Resultados para:{" "}
              <span className="text-white/60 font-medium">{query}</span>
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <span className="text-white/60 font-medium text-xl animate-pulse">
              Buscando no catálogo...
            </span>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-60">
            <SearchX size={64} className="mb-4" />
            <h3 className="text-2xl font-bold">Nenhum título encontrado</h3>
            <p className="mt-2 text-center">
              Não encontramos nada para "{query}". Tente buscar por um termo
              diferente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-x-5 gap-y-10">
            {movies.map((movie) => (
              <div key={movie.id} className="w-full flex justify-center">
                <div className="w-full max-w-55">
                  <MovieCard
                    title={movie.title}
                    imageUrl={movie.imageUrl}
                    rating={movie.rating}
                    year={movie.year}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default SearchPage;
