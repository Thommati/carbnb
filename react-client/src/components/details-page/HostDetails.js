import { useEffect, useState } from 'react';
import axios from 'axios';

import './HostDetails.scss';

const HostDetails = props => {
  const { email, id, image, name } = props.owner;
  const [reviews, setReview] = useState([]);

  useEffect(() => {
    const getHostReviews = async () => {
      console.log('hostId', id);
      if (id) {
        const response = await axios.get(`/api/reviews?hostId=${id}`);
        setReview(response.data);
      }
    };
    getHostReviews();
  }, [id]);

  const avgRating = Math.floor(reviews.reduce((acc, curr) => curr.rating + acc, 0) / reviews.length);

  // TODO: reviews need to be a five-star component
  return (
    <div className="host-details">
      <img
        className="host-details__image"
        src={image}
        alt="host's avatar"
      />
      <div className="host-details__details">
        <div>{name}</div>
        <div><a href={`mailto:${email}`}>Email Owner</a></div>
      </div>
      <div className="host-details__reviews">
        {avgRating || 'Not Rated'}
      </div>
    </div>
  );
};

export default HostDetails;
