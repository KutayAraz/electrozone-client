import Arrow from "@assets/svgs/arrow-black.svg?react";

interface MenuSection {
  id: string;
  title: string;
  links: Array<{ name: string; url: string }>;
}

interface MenuSectionProps {
  section: MenuSection;
  onClick: () => void;
}

export const MenuSection = ({ section, onClick }: MenuSectionProps) => (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-100"
  >
    <h4 className="text-lg">{section.title}</h4>
    <Arrow className="size-4" />
  </button>
);
