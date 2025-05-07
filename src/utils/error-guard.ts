import { ApiErrorPayload } from "@/types/api-error";

// Check if an error is a standard API error
export const isStandardApiError = (error: any): error is ApiErrorPayload => {
  return (
    error &&
    typeof error === "object" &&
    "data" in error &&
    typeof error.data === "object" &&
    "statusCode" in error.data &&
    "type" in error.data &&
    "message" in error.data &&
    (!("details" in error.data) ||
      typeof error.data.details === "string" ||
      error.data.details === undefined)
  );
};

// Check if an error is a network error (fetch failed)
export const isNetworkError = (error: any): boolean => {
  return (
    (error && typeof error === "object" && "status" in error && error.status === "FETCH_ERROR") ||
    (error instanceof Error && error.message.includes("Network request failed"))
  );
};

// Check if there's a server error (no response)
export const isServerDownError = (error: any): boolean => {
  return (
    (error && typeof error === "object" && "status" in error && error.status === "PARSING_ERROR") ||
    ("status" in error && typeof error.status === "number" && error.status >= 500)
  );
};
