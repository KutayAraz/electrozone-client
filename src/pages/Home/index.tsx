import userSlice, { selectCurrentUser } from "@/setup/slices/user-slice";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state:any) => state.user.firstName)
  return (
    <>
      <div className="flex flex-col max-w-screen-lg mx-auto text-center">
        <p>Carousel</p>
        <div>Top deals</div>
        <div>Best sellers</div>
        <p>More items to consider</p>
        <p>{user} Hello</p>
        <p>Discover more</p>
      </div>
    </>
  );
};

export default HomePage;
