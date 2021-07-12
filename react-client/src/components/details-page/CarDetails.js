import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { authContext } from '../../providers/authProvider';
import Description from './Description';
import HostDetails from './HostDetails';
import ReservationContainer from './ReservationContainer';

import './CarDetails.scss';
import LoadingSpinner from '../LoadingSpinner';



// Main component that is rendered when the details page is loaded.
// Coordinates all details page sub components.
const CarDetails = () => {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const [carData, setCarData] = useState({});

  useEffect(() => {
    const getCarData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`/api/cars/${id}`),
          axios.get(`/api/users/${user.id}`),
          axios.get(`/api/availability/cars/${id}`),
          axios.get(`/api/orders/cars/${id}`),
          axios.get(`/api/reviews?carId=${id}`)
        ]);

        setCarData({
          car: responses[0].data,
          owner: responses[1].data,
          listings: responses[2].data,
          orders: responses[3].data,
          reviews: responses[4].data
        });

      } catch (err) {
        console.error('Error retrieving car data', err);
      }
    };

    if (id && user.id) {
      getCarData();
    }
  }, [id, user.id]);

  useEffect(() => console.log('carData:', carData));

  if (carData.car) {
    return (
      <section className="car-details">
        <Description reviews={carData.reviews} car={carData.car} />
        <aside className="car-details__aside">
          <HostDetails owner={carData.owner} />
          <ReservationContainer
            carData={carData}
            setCarData={setCarData}
          />
        </aside>
      </section>
    );
  }
  return (
    <section>
      <LoadingSpinner />
    </section>
  );
};

export default CarDetails;
