import { List } from '@material-ui/core';
import ReactStars from 'react-rating-stars-component';
import ReviewItem from './ReviewItem';

import "./ReviewContainer.scss";

const ReviewContainer = props => {
  const { reviews } = props;

  const reviewItems = reviews.map(review => <ReviewItem data={review} key={review.id} />);
  const avgRating = reviews.reduce((acc, curr) => curr.rating + acc, 0) / reviews.length;

  // TODO: Need a five-star rating component to display rating
  if (reviews.length > 0) {
    return (
      <article className="review-container">
        <header>
          <span>REVIEWS</span>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            value={avgRating}
            edit={false}
          />
        </header>
        <hr/>
        <List className="review-container--list">
          {reviewItems}
        </List>
      </article>
    );
  } else {
    return null;
  }
};

export default ReviewContainer;
