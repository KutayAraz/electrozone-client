import RatingStars from "@/common/UI/StarIcon";

const HomePage = () => {
  const date = new Date().toLocaleDateString()
  return (
    <>
      <div className="flex flex-col max-w-screen-lg text-center">
        <p>{date}</p>
        <p>Carousel</p>
        <div>Top deals</div>
        <div>Best sellers</div>
        <p>More items to consider</p>
        <p>Discover more</p>
      </div>
      <div className="flex">
        <RatingStars rating={2.5} />
      </div>
    </>
  );
};

export default HomePage;
