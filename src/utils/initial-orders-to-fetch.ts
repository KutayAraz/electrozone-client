export const initialOrdersToFetch = ():number => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1280) {
      return 8;
    } else if (screenWidth > 1024) {
      return 6;
    } else if (screenWidth > 768) {
      return 6;
    } else {
      return 4;
    }
  }