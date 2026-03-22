import CategoryNav from "./components/CategoryNav";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { MovieList, type Movie } from "./components/MovieList";

const trendingActionMovies: Movie[] = [
  {
    id: 1,
    title: "One Piece: A Série",
    rating: 9.4,
    year: 2023,
    imageUrl:
      "https://media.themoviedb.org/t/p/original/6PjIeLXqd0h9IOBinG2FtPs2IL8.jpg",
  },
  {
    id: 2,
    title: "Peaky Blinders: The Immortal Man",
    rating: 7.3,
    year: 2026,
    imageUrl: "https://image.tmdb.org/t/p/w500/gRMalasZEzsZi4w2VFuYusfSfqf.jpg",
  },
  {
    id: 3,
    title: "Game of Thrones",
    rating: 9.2,
    year: 2011,
    imageUrl: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  },
  {
    id: 4,
    title: "The Mandalorian",
    rating: 8.6,
    year: 2019,
    imageUrl: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
  },
  {
    id: 5,
    title: "John Wick Chapter 3: Parabellum",
    rating: 7.4,
    year: 2014,
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BYjdlNWFlZjEtM2U0NS00ZWU5LTk1M2EtZmQxNWFiZjk0MGM5XkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    id: 6,
    title: "Friends",
    rating: 8.9,
    year: 1994,
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BOTU2YmM5ZjctOGVlMC00YTczLTljM2MtYjhlNGI5YWMyZjFkXkEyXkFqcGc@._V1_SX300.jpg",
  },
  {
    id: 7,
    title: "Stranger Things",
    rating: 8.9,
    year: 2016,
    imageUrl:
      "https://media.themoviedb.org/t/p/original/twfKp60THrcOIep9sjHODOOfO8d.jpg",
  },
  {
    id: 8,
    title: "The Boys",
    rating: 8.6,
    year: 2019,
    imageUrl: "https://image.tmdb.org/t/p/w500/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg",
  },
];

function App() {
  return (
    <div className="min-h-screen text-white font-sans w-full bg-linear-to-b from-[#596267] to-[#404A4D] overflow-x-hidden">
      <header className="px-6 md:px-10">
        <Header />
      </header>
      <main className="px-6 md:px-10 pb-12">
        <HeroSection />
        <CategoryNav />
        <MovieList title="Em alta no momento" movies={trendingActionMovies} />
      </main>
    </div>
  );
}

export default App;
