import { ratingDescriptions } from "../constants/rating-descriptions";

export const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${ratingDescriptions[value]}`;
};
