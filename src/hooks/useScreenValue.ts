import { useMediaQuery } from "@mui/material";

interface ScreenValueConfig {
  xsmall: number;
  small: number;
  medium: number;
  large: number;
  default: number;
}

const defaultConfig: ScreenValueConfig = {
  xsmall: 2,
  small: 4,
  medium: 6,
  large: 8,
  default: 10,
};

const useScreenValue = (config: ScreenValueConfig = defaultConfig) => {
  const isXSmall = useMediaQuery("(max-width:480px)");
  const isSmall = useMediaQuery("(max-width:768px)");
  const isMedium = useMediaQuery("(max-width:1024px)");
  const isLarge = useMediaQuery("(max-width:1280px)");

  if (isXSmall) return config.xsmall;
  if (isSmall) return config.small;
  if (isMedium) return config.medium;
  if (isLarge) return config.large;

  return config.default;
};

export default useScreenValue;
