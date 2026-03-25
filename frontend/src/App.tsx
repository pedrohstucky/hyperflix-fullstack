import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="min-h-screen text-white font-sans w-full bg-linear-to-b from-[#131619] to-[#101E27] overflow-x-hidden">
      <header className="px-6 md:px-10">
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route
            path="/title/:id"
            element={
              <div className="min-h-screen bg-black text-white/60 flex items-center justify-center text-2xl font-bold animate-pulse">
                Detalhes do Filme sendo construídos...
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
