import { ReviewType } from "../../models";

const Review = ({ rating, comment, reviewDate }: ReviewType) => {
  const date = new Date(reviewDate).toLocaleDateString();
  console.log(date)
  return (
    <div className="flex flex-col">
      <p>{date}</p>
      <p>{rating}</p> 
      <p>{comment}</p>
    </div>
  );
};

export default Review;