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
  return (
    <section className="car-details">
      <Description />
      <aside className="car-details__aside">
        <HostDetails image={tempHost.image} details={tempHost.details} reviews={tempHost.reviews} />
        <ReservationContainer startDate={new Date('2021-08-12T18:00:00')} endDate={new Date('2021-08-18T18:00:00')}/>
      </aside>
    </section>
  );
};

export default CarDetails;
