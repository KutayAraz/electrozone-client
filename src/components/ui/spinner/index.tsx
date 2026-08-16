import { CircularProgress } from "@mui/material";

interface SpinnerProps {
  size?: number;
  color?: "primary" | "secondary" | "inherit";
}

export const Spinner = ({ size = 40, color = "primary" }: SpinnerProps) => (
  <CircularProgress size={size} color={color} />
);

interface CenteredSpinnerProps extends SpinnerProps {
  className?: string;
}

export const CenteredSpinner = ({ className, ...props }: CenteredSpinnerProps) => (
  <div className={`flex items-center justify-center ${className ?? ""}`}>
    <Spinner {...props} />
  </div>
);

export const FullPageSpinner = () => <CenteredSpinner className="min-h-screen" />;
