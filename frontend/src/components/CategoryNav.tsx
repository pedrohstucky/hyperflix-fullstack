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
import { useNavigate } from "react-router-dom";

const categories = [
  { label: "Em alta", icon: Flame, id: 0 },
  { label: "Ação", icon: Swords, id: 28 },
  { label: "Aventura", icon: Compass, id: 12 },
  { label: "Terror", icon: Ghost, id: 27 },
  { label: "Romance", icon: Heart, id: 10749 },
  { label: "Comédia", icon: Smile, id: 35 },
  { label: "Animação", icon: Clapperboard, id: 16 },
  { label: "Drama", icon: VenetianMask, id: 18 },
  { label: "Ficção Científica", icon: Atom, id: 878 },
  { label: "Documentário", icon: BookOpen, id: 99 },
  { label: "Suspense", icon: Ghost, id: 53 },
];

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Em alta");
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isDragging = useRef(false);

  const navigate = useNavigate();

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

  const handleCategoryClick = (label: string, id: number) => {
    if (!isDragging.current) {
      setActiveCategory(label);

      if (id === 0) {
        navigate("/");
        return;
      }

      const slug = label
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      navigate(`/category/${id}?name=${slug}`);
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
          onClick={() => handleCategoryClick(category.label, category.id)}
        />
      ))}
    </nav>
  );
};

export default CategoryNav;
