import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen text-white font-sans w-full bg-linear-to-b from-[#596267] to-[#404A4D] overflow-x-hidden">
      <header className="px-6 md:px-10">
        <Header />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
