export const trendingFetch = (): number => {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1280) {
    return 6;
  } else if (screenWidth > 1024) {
    return 4;
  } else if (screenWidth > 768) {
    return 3;
  } else {
    return 3;
  }
};
