import { Rating } from "@mui/material";

import { ReviewType } from "../models";

export const Review = ({ id, rating, comment, reviewDate, reviewerInitials }: ReviewType) => {
  const date = new Date(reviewDate).toLocaleDateString();

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 p-4 shadow-sm" key={id}>
      <Rating
        name="half-rating-read"
        value={rating}
        precision={0.1}
        readOnly
        className="mb-1"
        size="small"
      />
      <div className="mb-2 flex items-center space-x-2 text-sm text-gray-600">
        <p>
          {reviewerInitials.firstName.toLowerCase()}.. {reviewerInitials.lastName.toLowerCase()}..
        </p>
        <p className="font-bold">&middot;</p>
        <p className="">{date}</p>
      </div>
      <p className="text-gray-800">{comment}</p>
    </div>
  );
};
