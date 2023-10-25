import { ReviewType } from "../models";

const Review = ({ id, rating, comment, reviewDate }: ReviewType) => {
  const date = new Date(reviewDate).toLocaleDateString();

  return (
    <div className="flex flex-col mt-6" key={id}>
      <p>{date}</p>
      <p>Rating: {rating}</p>
      <p>{comment}</p>
    </div>
  );
};

export default Review;
