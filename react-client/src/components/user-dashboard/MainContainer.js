
// const statuses = ['Booked', 'Cancelled'];

const bookings = {
  BookingID: '1',
  Image: 'https://i.gaw.to/vehicles/photos/40/22/402248-2021-honda-civic.jpg',
  DateFrom: '2021-07-10',
  DateTo: '2021-07-14',
  Make: 'Honda',
  Model: 'Civic',
  Description: '5 door',
  Price: '$480',
  Host: 'Jack Grielish',
  // Status: statuses[Math.floor(Math.random() * statuses.length)]
}

console.log(bookings);

function MainContainer() {
  return (
    <h1>USER TABLE</h1>
  )
}
export default MainContainer;
