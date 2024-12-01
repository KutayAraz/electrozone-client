export const initialProductsToFetch = (): number => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1280) {
    return 15;
  } else if (screenWidth > 1024) {
    return 12;
  } else if (screenWidth > 768) {
    return 9;
  } else {
    return 6;
  }
};
