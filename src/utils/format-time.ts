export const formatDateTime = (isoString: string) => {
  const dateObj = new Date(isoString);

  // Get date in format YYYY-MM-DD
  const date = dateObj.toISOString().split("T")[0];

  // Get time in HH:MM format
  const time = dateObj.toTimeString().split(" ")[0].slice(0, 5);

  return `${date} ${time}`;
};
