import CategoryNav from "./components/CategoryNav";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

function App() {
  return (
    <div className="h-screen w-full bg-linear-to-b from-[#596267] to-[#404A4D] px-5 md:px-10">
      <Header />
      <HeroSection />
      <CategoryNav />
    </div>
  );
}

export default App;
