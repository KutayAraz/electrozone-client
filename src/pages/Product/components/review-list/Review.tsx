import { ReviewType } from "@pages/product/models";

const Review = ({ rating, comment, date }: ReviewType) => {
  return (
    <div className="flex flex-col">
      <p>{date.toLocaleDateString()}</p>
      <p>{rating}</p>
      <p>{comment}</p>
    </div>
  );
};

export default Review;
