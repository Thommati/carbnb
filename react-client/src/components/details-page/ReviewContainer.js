import { List } from '@material-ui/core';
import ReviewItem from './ReviewItem';

const ReviewContainer = props => {
  const { reviews, avgRating } = props;

  const reviewItems = reviews.map(review => <ReviewItem data={review} />);

  return (
    <div>
      <div>
        <span>REVIEWS</span>
        <span>{avgRating}</span>
      </div>
      <List className="">
        {reviewItems}
      </List>
    </div>
  );
};

export default ReviewContainer;
