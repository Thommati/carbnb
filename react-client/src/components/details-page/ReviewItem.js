import { ListItem } from '@material-ui/core';
import ReactStars from 'react-rating-stars-component';

import './ReviewItem.scss';

const ReviewItem = props => {
  const {
    reviewer_image,
    reviewer_name,
    date_reviewed,
    rating,
    comments
  } = props.data;

  // TODO: Need a five-star rating component to display rating
  // TODO: Format date stamp
  return (
    <ListItem className="review-item">
      <img
        className="review-item__img"
        src={reviewer_image}
        alt={reviewer_name}
      />
      <div className="review-item__review-container">
        <div className="review-item__title-block">
          <h5>{reviewer_name}</h5>
          <ReactStars
            count={5}
            size={16}
            activeColor="#ffd700"
            value={rating}
            edit={false}
          />
        </div>
        <small>Reviewed on: {date_reviewed}</small>
        <p>{comments}</p>
      </div>
    </ListItem>
  );
};

export default ReviewItem;
