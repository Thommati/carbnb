import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Description from './Description';
import HostDetails from './HostDetails';
import ReservationContainer from './ReservationContainer';

import './CarDetails.scss';

const tempHost = {
  image: 'https://images.unsplash.com/photo-1507507000951-ce2a7d8fcc39?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGJyb3duJTIwdGFiYnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  details: 'Stuff to write about Empress Laseen goes here',
  reviews: '5'
};

// TODO: Host details cannot be hardcoded - get from props / state
// TODO: Proper values need to be given to startDate and endDate

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
        <ReservationContainer startDate={new Date()} endDate={new Date()}/>
      </aside>
    </section>
  );
};

export default CarDetails;
