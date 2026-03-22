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
import { useState } from "react";
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

  return (
    <nav className="w-full item-center gap-2 overflow-x-auto no-scrollbar mt-10 pb-2 flex">
      {categories.map((category) => (
        <CategoryButton
          key={category.label}
          label={category.label}
          icon={category.icon}
          isActive={activeCategory === category.label}
          onClick={() => setActiveCategory(category.label)}
        />
      ))}
    </nav>
  );
};

export default CategoryNav;
