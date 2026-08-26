import { useState } from "react";

export const useFormError = () => {
  const [serverError, setServerError] = useState<
    | {
        field: string;
        message: string;
      }
    | undefined
  >();

  const clearServerError = (field?: string) => {
    setServerError((prev) => (field && prev?.field === field ? undefined : prev));
  };

  return {
    serverError,
    setServerError,
    clearServerError,
  };
};
