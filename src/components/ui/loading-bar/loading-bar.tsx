import { LinearProgress } from "@mui/material";
import { useNavigation } from "react-router-dom";

export const LoadingIndicator = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && (
        <div className="fixed left-0 top-0 z-50 h-1 w-full">
          <LinearProgress />
        </div>
      )}
    </>
  );
};
