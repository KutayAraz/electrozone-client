import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
};
