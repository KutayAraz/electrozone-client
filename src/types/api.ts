export interface ApiError {
  status: number;
  data: {
    message: string;
    code?: string;
    field?: string;
  };
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error &&
    typeof (error as ApiError).data.message === "string"
  );
};

export enum HttpStatus {
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  CONFLICT = 409,
}
