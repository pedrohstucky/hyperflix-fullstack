import HeroCardItem from "./HeroCardItem";

const HeroSection = () => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
      <HeroCardItem
        className="md:col-span-2"
        title={"Top Gun:\nMaverick"}
        imageUrl="https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_SX300.jpg"
        bgColorHex="#B29965"
      />

      <HeroCardItem
        className="md:col-span-3"
        title={"Brooklyn\nNine-Nine"}
        imageUrl="https://m.media-amazon.com/images/M/MV5BNzBiODQxZTUtNjc0MC00Yzc1LThmYTMtN2YwYTU3NjgxMmI4XkEyXkFqcGc@._V1_SX300.jpg"
        bgColorHex="#5A6A71"
      />
    </section>
  );
};

export default HeroSection;
