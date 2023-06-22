import { Review } from "@Product/models";

const Review = ({ rating, review, date }: Review) => {
  return (
    <div className="flex flex-col">
      <p>{date.toLocaleDateString()}</p>
      <p>{rating}</p>
      <p>{review}</p>
    </div>
  );
};

export default Review;