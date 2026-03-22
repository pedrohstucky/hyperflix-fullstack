import { Button } from "./ui/button";
import type { ElementType } from "react";

interface CategoryButtonProps {
  label: string;
  icon: ElementType;
  isActive?: boolean;
  onClick: () => void;
}

const CategoryButton = ({
  label,
  icon: Icon,
  isActive = false,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center gap-2 px-10 py-7 rounded-[15px] font-light text-md transition-all whitespace-nowrap ${isActive ? "bg-[#767676]/80 text-white shadow-lg" : "bg-[#767676]/40 text-white/79 hover:bg-[#767676]/80 hover:text-white hover:shadow-lg hover:scale-103 cursor-pointer transition-transform duration-200"}`}
    >
      <Icon size={18} className={isActive ? "text-white" : "text-white/70"} />
      <span>{label}</span>
    </Button>
  );
};

export default CategoryButton;
