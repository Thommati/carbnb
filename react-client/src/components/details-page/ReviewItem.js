import { ListItem } from '@material-ui/core';

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
  return (
    <ListItem className="review-item">
      <img
        className="review-item__img"
        src={reviewer_image}
        alt={reviewer_name}
      />
      <div className="review-item__review-container">
        <div className="review-item__title-block">
          <h5>{reviewer_name}</h5>{rating}
        </div>
        <small>Reviewed on: {date_reviewed}</small>
        <p>{comments}</p>
      </div>
    </ListItem>
  );
};

export default ReviewItem;
