import { Rating } from "@mui/material";
import { ReviewType } from "./models";

const Review = ({ id, rating, comment, reviewDate }: ReviewType) => {
  const date = new Date(reviewDate).toLocaleDateString();

  return (
    <div
      className="flex flex-col my-4 p-4 border border-gray-200 shadow-sm rounded-md"
      key={id}
    >
      <p className="text-sm text-gray-600 mb-2">{date}</p>
      <Rating
        name="half-rating-read"
        value={rating}
        precision={0.1}
        readOnly
        className="text-lg mb-3" // Adjust text size if needed
      />
      <p className="text-gray-800">{comment}</p>
    </div>
  );
};

export default Review;
