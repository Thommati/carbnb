import { ListItem } from "@material-ui/core";

const ReviewItem = props => {
  const { dateReviewed, rating, review } = props;

  // TODO: Need a five-star rating component to display rating
  return (
    <ListItem className="review-item">
      <img
        className="review-item__img"
        src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="car"
      />
      <div className="review-item__review-container">
        {rating}
        <small>Reviewed: {dateReviewed}</small>
        <p>{review}</p>
      </div>
    </ListItem>
  );
};

export default ReviewItem;
