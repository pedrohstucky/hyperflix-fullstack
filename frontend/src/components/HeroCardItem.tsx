import { Play } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface HeroCardItemProps {
  title: string;
  imageUrl: string;
  bgColorHex: string;
  className?: string;
}

const HeroCardItem = ({
  title,
  imageUrl,
  bgColorHex,
  className,
}: HeroCardItemProps) => {
  return (
    <Card
      onClick={() => {}}
      className={`relative overflow-hidden w-full h-70 rounded-[20px] border-none text-white transition-transform duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-2xl group text-left ${className || ""}`}
      style={{ backgroundColor: bgColorHex }}
    >
      <div className="absolute top-0 right-0 w-[55%] h-full">
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to right, ${bgColorHex} 0%, transparent 100%)`,
          }}
        />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="relative z-20 flex flex-col justify-center h-full p-5 md:p-10 w-2/3">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 whitespace-pre-line leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-2 w-fit group-hover:text-white/80 group-hover:bg-[#121212]/90 transition-colors bg-[#121212] px-4 py-2 rounded-full">
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
