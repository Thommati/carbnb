import { ListItem } from '@material-ui/core';

import './ReviewItem.scss';

const ReviewItem = props => {
  const { image, date_reviewed, rating, comments } = props.data;

  // TODO: Need a five-star rating component to display rating
  return (
    <ListItem className="review-item">
      <img
        className="review-item__img"
        src={image}
        alt="car"
      />
      <div className="review-item__review-container">
        {rating}
        <small>Reviewed: {date_reviewed}</small>
        <p>{comments}</p>
      </div>
    </ListItem>
  );
};

export default ReviewItem;
