import { Bell, Search, X, Menu, User, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [count, setCount] = useState(5);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFetchingSearch, setIsFetchingSearch] = useState(false);

  const navigate = useNavigate();

  const executeSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      setIsFetchingSearch(true);
      const searchTerm = searchValue.trim();

      const response = await fetch(
        `http://localhost:8080/api/v1/catalog/search?query=${encodeURIComponent(searchTerm)}&page=1`,
      );

      if (!response.ok) throw new Error("Erro na API");

      const data = await response.json();

      setIsSearching(false);

      if (data.results && data.results.length === 1) {
        const uniqueMovie = data.results[0];
        navigate(`/title/${uniqueMovie.id}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`, {
          state: { initialData: data },
        });
      }
    } catch (error) {
      console.error("Erro ao buscar: ", error);

      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    } finally {
      setIsFetchingSearch(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isFetchingSearch) {
      executeSearch();
    }
  };

  const goToMovies = () =>
    navigate("/category/28", {
      state: { genreName: "Filmes" },
    });
  const goToSeries = () =>
    navigate("/category/10759", {
      state: { genreName: "Séries" },
    });
  const goToAnimes = () =>
    navigate("/category/16", {
      state: { genreName: "Animes" },
    });

  return (
    <header className="relative w-full py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center justify-between w-full md:w-auto cursor-pointer">
        <h1
          onClick={() => navigate("/")}
          className="font-black uppercase text-3xl md:text-4xl text-white tracking-tighter"
        >
          Hyperflix
        </h1>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="w-full md:w-auto flex justify-center order-last md:order-0">
        <div className="bg-black rounded-full p-1 flex items-center justify-between w-full md:w-95 max-w-105 pl-9 sm:pl-7 md:pl-8 relative overflow-hidden transition-all duration-300 shadow-md">
          <div
            className={`flex items-center justify-between w-full transition-all duration-300 pr-4 ${
              isSearching
                ? "opacity-0 invisible scale-95"
                : "opacity-100 visible scale-100"
            }`}
          >
            <p
              onClick={goToSeries}
              className="text-white text-sm sm:text-base font-medium cursor-pointer hover:text-gray-400 transition-colors"
            >
              Series
            </p>
            <p
              onClick={goToMovies}
              className="text-white text-sm sm:text-base font-medium cursor-pointer hover:text-gray-400 transition-colors"
            >
              Filmes
            </p>
            <p
              onClick={goToAnimes}
              className="text-white text-sm sm:text-base font-medium cursor-pointer hover:text-gray-400 transition-colors"
            >
              Animes
            </p>
          </div>

          <div
            className={`absolute inset-y-2 left-6 right-14 flex items-center transition-all duration-300 ease-in-out ${
              isSearching
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10 pointer-events-none"
            }`}
          >
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="bg-transparent w-full text-white text-base sm:text-base outline-none placeholder:text-gray-500 font-medium"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus={isSearching}
              disabled={isFetchingSearch}
            />
          </div>

          <button
            onClick={() => {
              if (isFetchingSearch) return;

              if (isSearching && searchValue.trim() !== "") {
                executeSearch();
              } else {
                setIsSearching(!isSearching);
                if (isSearching) setSearchValue("");
              }
            }}
            className="cursor-pointer p-2.5 bg-[#101010] rounded-full z-10 hover:bg-[#1d1d1d] transition-colors shrink-0"
          >
            {isFetchingSearch ? (
              <Loader2 className="text-white animate-spin" size={20} />
            ) : isSearching && searchValue === "" ? (
              <X className="text-white" size={20} />
            ) : (
              <Search className="text-white" size={20} />
            )}
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <div className="relative inline-flex items-center">
          <div className="p-1 bg-white/10 rounded-full">
            <button
              onClick={() => setCount(0)}
              className="p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
            >
              <Bell size={20} className="fill-white text-white" />
            </button>

            {count > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </div>
        </div>

        <div className="cursor-pointer flex items-center gap-3 group">
          <div className="bg-white p-2 rounded-full text-slate-900 group-hover:bg-gray-200 transition-colors">
            <User size={20} />
          </div>
          <div className="flex flex-col items-start justify-center">
            <span className="text-white font-bold text-sm group-hover:text-gray-200 transition-colors">
              Pedro Stucky
            </span>
            <span className="text-white/60 font-medium text-xs">Premium</span>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 w-64 bg-[#121212] rounded-2xl shadow-2xl border border-white/10 p-5 flex flex-col gap-4 z-50 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="bg-white p-2 rounded-full text-slate-900">
              <User size={20} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-white font-bold text-sm">Pedro Stucky</span>
              <span className="text-white/60 font-medium text-xs">Premium</span>
            </div>
          </div>

          <button
            onClick={() => setCount(0)}
            className="flex items-center justify-between w-full hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-full">
                <Bell size={18} className="text-white" />
              </div>
              <span className="text-white font-medium text-sm">
                Notificações
              </span>
            </div>

            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
