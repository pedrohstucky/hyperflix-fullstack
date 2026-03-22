import { Play } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

interface HeroCardItemProps {
  title: string;
  imageUrl: string;
  className?: string;
}

const HeroCardItem = ({ title, imageUrl, className }: HeroCardItemProps) => {
  const [bgColor, setBgColor] = useState<string>("#1e293b");
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (imgRef.current) {
      try {
        const fac = new FastAverageColor();
        fac.getColorAsync(imgRef.current).then((color) => {
          const [r, g, b] = color.value;

          const darkR = Math.max(0, r - 40);
          const darkG = Math.max(0, g - 40);
          const darkB = Math.max(0, b - 40);

          setBgColor(`rgb(${darkR}, ${darkG}, ${darkB})`);
        });
      } catch (error) {
        console.error("Erro ao extrair cor da imagem: ", error);
      }
    }
  };

  return (
    <Card
      onClick={() => {}}
      className={`relative overflow-hidden w-full h-70 rounded-[20px] border-none text-white transition-transform duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-2xl group text-left ${className || ""}`}
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.8s ease",
      }}
    >
      <div className="absolute top-0 right-0 w-[65%] h-full flex justify-end">
        <img
          ref={imgRef}
          src={imageUrl}
          alt={title}
          crossOrigin="anonymous"
          onLoad={handleImageLoad}
          className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-300"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 60%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 60%)",
          }}
        />
      </div>

      <CardContent className="relative z-20 flex flex-col justify-center h-full p-5 md:p-10 w-2/3 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 whitespace-pre-line leading-tight drop-shadow-lg">
          {title}
        </h1>

        <div className="flex items-center gap-2 w-fit pointer-events-auto group-hover:text-white/80 group-hover:bg-[#121212]/90 transition-colors bg-[#121212] px-4 py-2 rounded-full">
          <Play
            size={16}
            className="fill-white group-hover:fill-white/80 transition-colors"
          />
          <span className="font-medium text-sm">Assistir Agora</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroCardItem;
