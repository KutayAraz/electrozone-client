import { Rating } from "@mui/material";

export interface ReviewProps {
  id: number;
  reviewDate: string;
  rating: string;
  comment: string;
  reviewerInitials: { firstName: string; lastName: string };
}

export const Review = ({ id, rating, comment, reviewDate, reviewerInitials }: ReviewProps) => {
  const date = new Date(reviewDate).toLocaleDateString();

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 p-4 shadow-sm" key={id}>
      <Rating
        name="half-rating-read"
        value={Number(rating)}
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
