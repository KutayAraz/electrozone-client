import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="page-spacing h-36 flex flex-col space-y-4">
      <div>
        <h4 className="text-2xl font-semibold">404 Not Found</h4>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="underline text-theme-blue"
      >
        Go back
      </button>
    </div>
  );
};
export default Error;
