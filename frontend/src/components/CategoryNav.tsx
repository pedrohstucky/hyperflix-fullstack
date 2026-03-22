import {
  Atom,
  BookOpen,
  Clapperboard,
  Compass,
  Flame,
  Ghost,
  Heart,
  Smile,
  Swords,
  VenetianMask,
} from "lucide-react";
import React, { useRef, useState } from "react";
import CategoryButton from "./CategoryButton";

const categories = [
  { label: "Em alta", icon: Flame },
  { label: "Ação", icon: Swords },
  { label: "Aventura", icon: Compass },
  { label: "Terror", icon: Ghost },
  { label: "Romance", icon: Heart },
  { label: "Comédia", icon: Smile },
  { label: "Animação", icon: Clapperboard },
  { label: "Drama", icon: VenetianMask },
  { label: "Ficção Científica", icon: Atom },
  { label: "Documentário", icon: BookOpen },
];

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Em alta");
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    isDragging.current = false;
    if (!sliderRef.current) return;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;
    e.preventDefault();
    isDragging.current = true;

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleCategoryClick = (label: string) => {
    if (!isDragging.current) {
      setActiveCategory(label);
    }
  };

  return (
    <nav
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className="w-full item-center gap-2 overflow-x-auto no-scrollbar mt-10 pb-2 flex cursor-grab active:cursor-grabbing select-none"
    >
      {categories.map((category) => (
        <CategoryButton
          key={category.label}
          label={category.label}
          icon={category.icon}
          isActive={activeCategory === category.label}
          onClick={() => handleCategoryClick(category.label)}
        />
      ))}
    </nav>
  );
};

export default CategoryNav;
