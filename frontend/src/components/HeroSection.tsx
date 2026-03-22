import HeroCardItem from "./HeroCardItem";

const HeroSection = () => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
      <HeroCardItem
        className="md:col-span-2"
        title={"Mercy:\nProva de Culpa"}
        imageUrl="https://media.themoviedb.org/t/p/original/uNUJHzDGR6WeVibUn0hm6FJbMdh.jpg"
      />

      <HeroCardItem
        className="md:col-span-3"
        title={"Avatar:\nFogo e Cinzas"}
        imageUrl="https://media.themoviedb.org/t/p/original/ywSmtzjp3ueZeGsrzXJsUDnMcqE.jpg"
      />
    </section>
  );
};

export default HeroSection;
