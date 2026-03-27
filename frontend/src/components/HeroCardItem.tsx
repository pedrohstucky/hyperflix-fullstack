import { Play } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useRef, useState } from "react";
import { FastAverageColor } from "fast-average-color";

interface HeroCardItemProps {
  title: string;
  imageUrl: string;
  className?: string;
  onClick: () => void;
}

const HeroCardItem = ({
  title,
  imageUrl,
  className,
  onClick,
}: HeroCardItemProps) => {
  const [bgColor, setBgColor] = useState<string>("#1e293b");
  const imgRef = useRef<HTMLImageElement>(null);

  const proxiedImageUrl = `https://wsrv.nl/?url=${encodeURIComponent(imageUrl)}`;

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
      onClick={onClick}
      className={`relative overflow-hidden w-full h-70 rounded-[20px] border-none text-white transition-transform duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-2xl group text-left ${className || ""}`}
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.8s ease",
      }}
    >
      <div className="absolute top-0 right-0 w-[65%] h-full flex justify-end">
        <img
          ref={imgRef}
          src={proxiedImageUrl}
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

      <CardContent className="relative z-20 flex flex-col justify-center h-full p-5 md:p-10 w-2/3">
        <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">{title}</h1>
        <div className="flex gap-3 items-center">
          <div className="flex items-center w-10 h-10 group-hover:text-white/80 group-hover:bg-black/80 transition-colors bg-black px-4 py-2 rounded-full">
            <Play
              size={16}
              className="fill-white group-hover:fill-white/80 transition-colors"
            />
          </div>
          <span className="font-medium text-sm">Obter Informações</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroCardItem;
