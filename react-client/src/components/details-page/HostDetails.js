import './HostDetails.scss';

const HostDetails = props => {
  const { details, reviews, image } = props;

  // TODO: reviews need to be a five-star component
  return (
    <div className="host-details">
      <img
        className="host-details__image"
        src={image}
        alt="host's avatar"
      />
      <div className="host-details__details">
        {details}
      </div>
      <div className="host-details__reviews">
        {reviews}
      </div>
    </div>
  );
};

export default HostDetails;
