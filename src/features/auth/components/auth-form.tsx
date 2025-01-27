import { CircularProgress } from "@mui/material";

type AuthFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  isLoading: boolean;
  submitText: string;
  loadingText: string;
  children: React.ReactNode;
  signUpButton?: React.ReactNode;
};

export const AuthForm = ({
  onSubmit,
  isValid,
  isLoading,
  submitText,
  loadingText,
  children,
  signUpButton,
}: AuthFormProps) => {
  return (
    <form action="POST" onSubmit={onSubmit}>
      <div className="mx-2 mb-4 flex max-w-md flex-col rounded-xl bg-gray-100 p-6 shadow-md xs:mx-auto">
        {children}
        <button
          type="submit"
          className={`mt-4 w-full rounded-lg py-2 font-semibold text-white ${
            isValid ? "bg-theme-blue hover:bg-blue-700" : "bg-gray-400"
          } transition duration-300 ease-in-out`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <CircularProgress
                style={{ width: "1.25rem", height: "1.25rem" }}
                sx={{ color: "#13193F" }}
                className="mr-2"
              />
              <p>{loadingText}</p>
            </div>
          ) : (
            submitText
          )}
        </button>
        {signUpButton}
      </div>
    </form>
  );
};
