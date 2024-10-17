import { Rating } from "@mui/material";
import { ReviewType } from "./models";

const Review = ({ id, rating, comment, reviewDate, reviewerInitials }: ReviewType) => {
  const date = new Date(reviewDate).toLocaleDateString();

  return (
    <div
      className="flex flex-col p-4 border border-gray-200 shadow-sm rounded-lg"
      key={id}
    >
      <Rating
        name="half-rating-read"
        value={rating}
        precision={0.1}
        readOnly
        className="mb-1"
        size="small"
      />
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
        <p>{reviewerInitials.firstName.toLowerCase()}.. {reviewerInitials.lastName.toLowerCase()}..</p>
        <p className="font-bold">&middot;</p>
        <p className="">{date}</p>
      </div>
      <p className="text-gray-800">{comment}</p>
    </div>
  );
};

export default Review;
