type MenuSection = {
  id: string;
  title: string;
  links: Array<{ name: string; url: string }>;
};

type TrendingLink = {
  name: string;
  url: string;
};

type MenuItem = {
  name: string;
  url: string;
};

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: "tvsAndSoundbars",
    title: "TVs & Soundbars",
    links: [
      { name: "TVs", url: "/category/tvs-and-soundbars/tvs" },
      { name: "Soundbars", url: "/category/tvs-and-soundbars/soundbars" },
    ],
  },
  {
    id: "computersAndAccessories",
    title: "Computers & Accessories",
    links: [
      { name: "PCs", url: "/category/computers-and-accessories/computers" },
      { name: "Laptops", url: "/category/computers-and-accessories/laptops" },
      { name: "Monitors", url: "/category/computers-and-accessories/monitors" },
      {
        name: "Computer Accessories",
        url: "/category/computers-and-accessories/computer-accessories",
      },
    ],
  },
  {
    id: "smartphonesAndAccessories",
    title: "Smartphones & Accessories",
    links: [
      { name: "Smartphones", url: "/category/smartphones-and-accessories/smartphones" },
      {
        name: "Smartphone Accessories",
        url: "/category/smartphones-and-accessories/smartphone-accessories",
      },
    ],
  },
  {
    id: "printersAndInk",
    title: "Printers & Ink",
    links: [
      { name: "Laser Printers", url: "/category/printers-and-ink/laser-printers" },
      { name: "Inkjet Printers", url: "/category/printers-and-ink/inkjet-printers" },
      { name: "Ink", url: "/category/printers-and-ink/ink" },
    ],
  },
];

export const TRENDING_LINKS: TrendingLink[] = [
  { name: "Best Sellers", url: "/trending/best-sellers" },
  { name: "Most Wishlisted", url: "/trending/most-wishlisted" },
  { name: "Best Rated", url: "/trending/best-rated" },
];

export const MENU_ITEMS: MenuItem[] = [
  { name: "Best Sellers", url: "/trending/best-sellers" },
  { name: "TVs", url: "/category/tvs-and-soundbars/tvs" },
  { name: "Most Wishlisted", url: "/trending/most-wishlisted" },
  { name: "Laptops", url: "/category/computers-and-accessories/laptops" },
  { name: "Best Rated", url: "/trending/best-rated" },
  { name: "Smartphones", url: "/category/smartphones-and-accessories/smartphones" },
  { name: "Laser Printers", url: "/category/printers-and-ink/laser-printers" },
  { name: "PCs", url: "/category/computers-and-accessories/computers" },
];
