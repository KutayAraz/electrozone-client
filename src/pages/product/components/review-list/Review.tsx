import { ReviewType } from "../../models";

const Review = ({ id, rating, comment, reviewDate }: ReviewType) => {
  const date = new Date(reviewDate).toLocaleDateString();

  return (
    <div className="flex flex-col mx-auto text-center mt-6">
      <p>{date}</p>
      <p>Rating: {rating}</p>
      <p>{comment}</p>
    </div>
  );
};

export default Review;
