import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Play, Star } from "lucide-react";

interface TitleDetailsData {
  id: number;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  rating: number | null;
  year: number | null;
  type: "movie" | "tv";
  runtime: number | null;
  seasons: number | null;
  genres: string[];
}

export default function TitleDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.state?.type || "movie";

  const [details, setDetails] = useState<TitleDetailsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/catalog/title/${type}/${id}`,
        );
        if (!response.ok) throw new Error("Erro ao buscar detalhes");

        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-white/60 animate-pulse text-xl">
          Carregando informações...
        </span>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-white">Título não encontrado</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-white/20 rounded-md text-white hover:bg-white/10"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-10 font-sans text-white animate-in fade-in duration-700">
      {details.backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-[#101E27] via-[#131619]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-r from-[#101E27] via-[#131619]/60 to-transparent z-10" />
          <img
            src={details.backdropUrl}
            alt={details.title}
            className="w-full h-[80vh] object-cover blur-sm scale-105"
          />
        </div>
      )}

      <div className="pt-10 px-6 md:px-20 w-full mx-auto relative z-20">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 w-12 h-12 flex items-center justify-center bg-black/60 hover:bg-black/90 rounded-full transition-colors cursor-pointer border border-white/10"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="shrink-0">
            {details.posterUrl ? (
              <img
                src={details.posterUrl}
                alt={details.title}
                className="w-65 md:w-80 rounded-2xl shadow-2xl object-cover"
              />
            ) : (
              <div className="w-55 md:w-80 aspect-2/3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                Sem Pôster
              </div>
            )}
          </div>

          <div className="flex-1 mt-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
              {details.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm md:text-base font-medium">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-white text-white" />
                <span>{details.rating?.toFixed(1)}</span>
              </div>
              {details.year && <span>{details.year}</span>}

              {details.runtime ? (
                <span>{details.runtime} min</span>
              ) : details.seasons ? (
                <span>
                  {details.seasons} Temporada{details.seasons > 1 && "s"}
                </span>
              ) : null}

              <div className="flex flex-wrap gap-2 ml-2">
                {details.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs md:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-7 w-full 2xl:max-w-4xl">
              <h3 className="text-2xl font-bold mb-4">Sinopse</h3>
              <p className="text-white/80 text-lg leading-relaxed font-light">
                {details.overview ||
                  "Nenhuma sinopse disponível para este título em português."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("trailer-section")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="max-w-2xl flex items-center mt-7 gap-3 cursor-pointer group w-fit outline-none focus-visible:ring-1 focus-visible:ring-white rounded-lg"
              aria-label="Rolar para a seção do trailer"
            >
              <div className="bg-black group-hover:bg-black/80 p-3 rounded-full">
                <Play size={16} className="fill-white" />
              </div>
              <span className="font-semibold text-lg">Assistir ao Trailer</span>
            </button>
          </div>
        </div>

        {/* Preparação para feature de trailer (nova feature) */}
        <div id="trailer-section" className="w-full mt-16 md:mt-24">
          <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center relative shadow-2xl overflow-hidden group">
            {details.backdropUrl && (
              <img
                src={details.backdropUrl}
                alt="Trailer Background"
                className="w-full h-full object-cover opacity-50 grayscale-20"
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pl-2 border border-white/30 cursor-pointer hover:bg-white/40 hover:scale-110 transition-all duration-300">
                <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-white border-b-12 border-b-transparent"></div>
              </div>
            </div>

            <div className="absolute bottom-0 w-full h-1.5 bg-white/20">
              <div className="h-full w-1/4 bg-red-600 rounded-r-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,1)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
