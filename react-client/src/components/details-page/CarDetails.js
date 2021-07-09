import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Description from './Description';
import HostDetails from './HostDetails';
import ReservationContainer from './ReservationContainer';

import './CarDetails.scss';

// Main component that is rendered when the details page is loaded.
// Coordinates all details page sub components.
const CarDetails = (props) => {
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [reviews, setReviews] = useState([]);
  const [owner, setOwner] = useState({});

  useEffect(() => {
    const getCarData = async () => {
      const carResponse = await axios.get(`/api/cars/${id}`);

      // Not doing API calls in parallel because I need the user_id from carResponse
      // to be able to make the call to /api/users/:id
      const ownerResponse = await axios.get(`/api/users/${carResponse.data.user_id}`);

      setCar(carResponse.data);
      setOwner(ownerResponse.data);
    };
    getCarData();
  }, [id]);

  useEffect(() => {
    const getCarReviews = async () => {
      const response = await axios.get(`/api/reviews?carId=${id}`);
      setReviews(response.data);
    };
    getCarReviews();
  }, [id]);

  return (
    <section className="car-details">
      <Description reviews={reviews} car={car} />
      <aside className="car-details__aside">
        <HostDetails owner={owner} />
        <ReservationContainer
          startDate={new Date()}
          endDate={new Date()}
          carId={car.id}
          price={car.price}
          province={car.province}
        />
      </aside>
    </section>
  );
};

export default CarDetails;
