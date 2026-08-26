import ErrorIcon from "@mui/icons-material/Error";
import { Button } from "@mui/material";

export const GlobalErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <ErrorIcon sx={{ fontSize: 72 }} color="error" className="mb-4" />

        <h1 className="mb-2 text-2xl font-bold text-gray-900">Application Error</h1>

        <p className="mb-4 text-gray-600">
          Something went wrong. The application encountered an unexpected error.
        </p>

        {/* Show error details in development */}
        {import.meta.env.DEV && (
          <details className="mb-6 rounded bg-red-50 p-4 text-left">
            <summary className="cursor-pointer text-sm font-semibold text-red-800">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-red-700">
              {error.message}
              {error.stack && "\n\n" + error.stack}
            </pre>
          </details>
        )}

        <div className="flex justify-center gap-3">
          <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
            Try Again
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              // Clear any persisted state that might be causing issues
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "/";
            }}
          >
            Reset App
          </Button>
        </div>
      </div>
    </div>
  );
};
