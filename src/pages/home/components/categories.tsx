import { Link } from "react-router-dom";

import ComputersAndAccessories from "@assets/images/Computers-Accessories.webp";
import PrintersAndInk from "@assets/images/Printers-Ink.webp";
import SmartphonessAndAccessories from "@assets/images/Smartphones&Acc.webp";
import TVsAndSoundbars from "@assets/images/TVs-Soundbars.webp";

export const Categories = () => {
  return (
    <>
      <h2 className="mt-2 text-xl font-semibold text-gray-700 ">Shop by Category</h2>
      <div className="mx-[2%] flex flex-wrap xl:mx-auto">
        <Link
          to={"/category/tvs-and-soundbars"}
          className="flex w-1/2 flex-col justify-between p-2 md:w-1/4"
        >
          <h4 className="text-lg font-[500] text-gray-700">TVs & Soundbars</h4>
          <img
            src={TVsAndSoundbars}
            alt="TVs & Soundbars Category"
            className="mx-auto h-auto w-64 object-contain"
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link
          to={"/category/computers-and-accessories"}
          className="flex w-1/2 flex-col justify-between p-2 md:w-1/4"
        >
          <h4 className="text-lg font-[500] text-gray-700">Computers & Accessories</h4>
          <img
            src={ComputersAndAccessories}
            alt="Computers & Accessories Category"
            className="mx-auto h-auto w-64 object-contain"
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link
          to={"/category/smartphones-and-accessories"}
          className="flex w-1/2 flex-col justify-between p-2 md:w-1/4"
        >
          <h4 className="text-lg font-[500] text-gray-700">Smartphones & Accessories</h4>
          <img
            src={SmartphonessAndAccessories}
            alt="Smartphones & Accessories Category"
            className="mx-auto h-auto w-64 object-contain"
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link
          to={"/category/printers-and-ink"}
          className="flex w-1/2 flex-col justify-between p-2 md:w-1/4"
        >
          <h4 className="text-lg font-[500] text-gray-700">Printers & Ink</h4>
          <img
            src={PrintersAndInk}
            alt="Printers & Ink Category"
            className="mx-auto h-auto w-64 object-contain"
            style={{ borderRadius: "15px" }}
          />
        </Link>
      </div>
    </>
  );
};
