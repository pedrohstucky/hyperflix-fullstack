import { MovieCard } from "@/components/MovieCard";
import type { Movie } from "@/components/MovieList";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GENRE_MAP: Record<string, string> = {
  "28": "Ação",
  "12": "Aventura",
  "27": "Terror",
  "10749": "Romance",
  "35": "Comédia",
  "16": "Animação",
  "18": "Drama",
  "878": "Ficção Científica",
  "99": "Documentário",
};

interface PageData {
  page: number;
  totalPages: number;
  results: Movie[];
}

function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const genreName = id ? GENRE_MAP[id] : "Categoria";
  const [data, setData] = useState<PageData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/catalog/discover?genreId=${id}&page=${currentPage}`,
        );
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error("Erro ao buscar categoria: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [id, currentPage]);

  const renderPagination = () => {
    if (!data) return null;
    const total = Math.min(data.totalPages, 500);

    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(total, startPage + 4);

    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);

    return (
      <div className="flex items-center justify-center gap-3 mt-12">
        {pages.map((p) => (
          <Button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentPage === p ? "bg-black text-white}" : "text-white hover:bg-black/80 bg-transparent cursor-pointer"}`}
          >
            {p}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white font-sans w-full overflow-x-hiddens">
      <main className="px-6 md:px-20 pb-12 mt-6">
        <div className="flex items-center gap-3 mb-8">
          <Button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} className="text-white" />
          </Button>

          <div className="bg-black px-6 py-2 rounded-full">
            <h2 className="text-white font-bold text-xl">{genreName}</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <span className="text-white/60 font-medium text-xl animate-pulse">
              Carregando catálogo...
            </span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-x-6 gap-y-10">
              {data?.results.map((movie) => (
                <div key={movie.id} className="w-full">
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
                </div>
              ))}
            </div>

            {renderPagination()}
          </>
        )}
      </main>
    </div>
  );
}

export default CategoryPage;
