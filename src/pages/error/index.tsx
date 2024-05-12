import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "@assets/svg/backbutton.svg"
import { Divider } from "@mui/material";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="page-spacing mx-auto flex flex-col space-y-4 text-center">
      <div>
        <h4 className="text-2xl font-semibold">404 Not Found</h4>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
      <Divider />
      <button
        onClick={() => navigate(-1)}
        className="underline text-theme-blue flex mx-auto"
      >
        <span><BackArrow className="w-6 h-auto" /></span>
        Go back
      </button>
    </div>

  );
};
export default Error;
