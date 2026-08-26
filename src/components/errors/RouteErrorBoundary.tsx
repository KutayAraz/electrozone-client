import ErrorIcon from "@mui/icons-material/Error";
import { Button } from "@mui/material";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export const RouteErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.log("Route error:", error);

  // Handle different error types
  let errorMessage = "An unexpected error occurred";
  let errorDetails = "";
  let statusCode = 500;

  // Check for RTK Query errors first (API errors)
  if (error && typeof error === "object" && "status" in error && "data" in error) {
    // This is an RTK Query error
    statusCode = error.status as number;

    // Extract message from the nested data structure
    if (error.data && typeof error.data === "object" && "message" in error.data) {
      errorMessage = error.data.message as string;

      // Parse details if it's a string
      if ("details" in error.data && typeof error.data.details === "string") {
        try {
          const parsedDetails = JSON.parse(error.data.details);
          errorDetails = parsedDetails.message || error.data.details;
        } catch {
          errorDetails = error.data.details as string;
        }
      }
    }
  } else if (isRouteErrorResponse(error)) {
    // React Router error responses (404, 401, etc.)
    statusCode = error.status;
    errorMessage = error.statusText || errorMessage;
    errorDetails = error.data?.message || "";
  } else if (error instanceof Error) {
    // JavaScript errors (including loader errors)
    errorMessage = error.message;
    errorDetails = error.stack || "";
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  // Determine if this is a critical error or just a 404/400
  const isCritical = statusCode >= 500;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md text-center">
        <ErrorIcon sx={{ fontSize: 64 }} color={isCritical ? "error" : "warning"} />

        <h1 className="mb-2 mt-4 text-2xl font-bold">
          {statusCode === 404
            ? "Page Not Found"
            : `Oops! ${statusCode === 400 ? "Invalid Request" : "Something went wrong"}`}
        </h1>

        <p className="mb-6 text-gray-600">{errorMessage}</p>

        {/* Show error details if available */}
        {errorDetails && (
          <div className="mb-6 rounded bg-gray-100 p-4 text-left">
            <p className="text-sm font-semibold text-gray-700 mb-2">Error Details:</p>
            <pre className="overflow-auto text-xs text-gray-600 whitespace-pre-wrap break-words">
              {errorDetails}
            </pre>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <Button variant="contained" onClick={() => navigate(-1)}>
            Go Back
          </Button>

          <Button variant="outlined" onClick={() => navigate("/")}>
            Home Page
          </Button>
        </div>
      </div>
    </div>
  );
};
