import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <h2 className="font-semibold text-xl text-gray-700 mt-2 ">
        Shop by Category
      </h2>
      <div className="flex flex-wrap mx-[2%] xl:mx-auto">
        <Link
          to={"/category/tvs-and-soundbars"}
          className="w-1/2 md:w-1/4 p-2 flex flex-col justify-between"
        >
          <h4 className="text-lg font-[500] text-gray-700">TVs & Soundbars</h4>
          <img
            src="https://storage.googleapis.com/electrozone-image/TVs-Soundbars.webp"
            className="w-64 h-auto object-contain mx-auto"
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link
          to={"/category/computers-and-accessories"}
          className="w-1/2 md:w-1/4 p-2 flex flex-col justify-between"
        >
          <h4 className="text-lg font-[500] text-gray-700">
            Computers & Accessories
          </h4>
          <img
            src="https://storage.googleapis.com/electrozone-image/Computers-Accessories.webp"
            className="w-64 h-auto object-contain mx-auto"
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link
          to={"/category/smartphones-and-accessories"}
          className="w-1/2 md:w-1/4 p-2 flex flex-col justify-between"
        >
          <h4 className="text-lg font-[500] text-gray-700">
            Smartphones & Accessories
          </h4>
          <img
            src="https://storage.googleapis.com/electrozone-image/Smartphones%26Acc.webp"
            className="w-64 h-auto object-contain mx-auto"
            style={{ borderRadius: "15px" }}
          />
        </Link>
        <Link
          to={"/category/printers-and-ink"}
          className="w-1/2 md:w-1/4 p-2 flex flex-col justify-between"
        >
          <h4 className="text-lg font-[500] text-gray-700">TVs & Soundbars</h4>
          <img
            src="https://storage.googleapis.com/electrozone-image/Printers-Ink.webp"
            className="w-64 h-auto object-contain mx-auto"
            style={{ borderRadius: "15px" }}
          />
        </Link>
      </div>
    </>
  );
};

export default Categories;
