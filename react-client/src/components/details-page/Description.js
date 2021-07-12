import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';

import ReviewContainer from './ReviewContainer';
import "./Description.scss";
import { getPriceRange } from '../../helpers/listing-helpers';

// Contains image, description, and features of the selected car
// TODO: List items should be generated by mapping over an array of features instead of being hard-coded.
const Description = props => {
  const { reviews, car, listings } = props.carData;

  const { minPrice, maxPrice } = getPriceRange(listings);

  let features = [
    `${car.doors} Doors`,
    car.colour,
    car.transmission ? 'Manual Trasmission' : false,
    car.pet_friendly ? 'Pet Friendly' : false,
    `${car.fuel} Engine`,
    `${car.seats} seats`,
    car.convertible ? 'Convertible' : false
  ];

  features = features.filter(f => f);

  const featureListItems = features.map(feature => (
    <ListItem className="Details__features--item" key={feature}>
      <ListItemIcon>
        <CheckCircle />
      </ListItemIcon>
      <ListItemText primary={feature} />
    </ListItem>
  ));

  return (
    <div className="description">
      <img
        src={car.image}
        alt={`${car.make} ${car.model}`}
        className="Details__vehicle-image"
      />
      <div className="Details__content">
        <h2>{car.model_year} {car.make} {car.model}</h2>
        {(minPrice && maxPrice) && <h4>From: ${minPrice} - ${maxPrice} per Day</h4>}
        <p>{car.description}</p>
      </div>
      <div className="Details__content">
        <h3 className="Details__features-title">Features</h3>
        <List className="Details__features">
          {featureListItems}
        </List>
      </div>
      <ReviewContainer reviews={reviews} avgRating="5" />
    </div>
  );
};

export default Description;
