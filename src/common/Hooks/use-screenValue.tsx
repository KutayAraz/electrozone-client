import { useMediaQuery } from '@mui/material';

const useScreenValue = () => {
  // Define media queries directly
  const isXSmall = useMediaQuery('(max-width:480px)');
  const isSmall = useMediaQuery('(max-width:768px)');
  const isMedium = useMediaQuery('(max-width:1024px)');
  const isLarge = useMediaQuery('(max-width:1280px)');

  // Assign values based on the matching media query
  if (isXSmall) return 2; // Assuming these values are aligned with your design requirements
  if (isSmall) return 4;
  if (isMedium) return 6;
  if (isLarge) return 8;

  // Default value for screens larger than 1280px
  return 10;
};

export default useScreenValue;