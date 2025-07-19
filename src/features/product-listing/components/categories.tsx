import { Link } from "react-router-dom";

import ComputersAndAccessories from "@assets/images/Computers-Accessories.webp";
import PrintersAndInk from "@assets/images/Printers-Ink.jpg";
import SmartphonessAndAccessories from "@assets/images/Smartphones-Accessories.webp";
import TVsAndSoundbars from "@assets/images/TVs-Soundbars.webp";

const categories = [
  {
    title: "TVs & Soundbars",
    image: TVsAndSoundbars,
    link: "/category/tvs-and-soundbars",
    alt: "TVs & Soundbars Category",
  },
  {
    title: "Computers & Accessories",
    image: ComputersAndAccessories,
    link: "/category/computers-and-accessories",
    alt: "Computers & Accessories Category",
  },
  {
    title: "Smartphones & Accessories",
    image: SmartphonessAndAccessories,
    link: "/category/smartphones-and-accessories",
    alt: "Smartphones & Accessories Category",
  },
  {
    title: "Printers & Ink",
    image: PrintersAndInk,
    link: "/category/printers-and-ink",
    alt: "Printers & Ink Category",
  },
];

export const Categories = () => {
  return (
    <section className="py-4 md:py-8 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
        <p className="text-gray-600">Discover our wide range of electronics and accessories</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={category.image}
                alt={category.alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />

              {/* Always visible bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Enhanced overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-sm md:text-base font-semibold leading-tight drop-shadow-2xl">
                {category.title}
              </h3>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-colors duration-300" />
          </Link>
        ))}
      </div>
    </section>
  );
};
