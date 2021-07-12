import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { authContext } from '../../providers/authProvider';
import Description from './Description';
import HostDetails from './HostDetails';
import ReservationContainer from './ReservationContainer';
import LoadingSpinner from '../LoadingSpinner';

import './CarDetails.scss';


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
          axios.get(`/api/availability/cars/${id}`),
          axios.get(`/api/orders/cars/${id}`),
          axios.get(`/api/reviews?carId=${id}`)
        ]);

        // Need to use the car owner's id from the car object
        const ownerResponse = await axios.get(`/api/users/${responses[0].data.user_id}`);

        setCarData({
          car: responses[0].data,
          owner: ownerResponse.data,
          listings: responses[1].data,
          orders: responses[2].data,
          reviews: responses[3].data
        });

      } catch (err) {
        console.error('Error retrieving car data', err);
      }
    };

    if (id && user.id) {
      getCarData();
    }
  }, [id, user.id]);

  if (carData.car) {
    return (
      <section className="car-details">
        <Description carData={carData} />
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
