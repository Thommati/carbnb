import { List, ListItem } from '@material-ui/core';

import './ReservationDetail.scss';

const ReservationDetail = props => {
  const { price, days, serviceFees, taxRate } = props;

  const taxAmount = () => (price + serviceFees) * days * taxRate / 100;

  const totalPrice = () => (price + serviceFees) * days + taxAmount();

  return (
    <div className="reservation-details">
      <List>
        <ListItem>
          <div className="reservation-details__list-item">
            <span>{price} x {days}</span>
            <span>${price * days}</span>
          </div>
        </ListItem>
        <ListItem>
          <div className="reservation-details__list-item">
            <span>Service Fee</span>
            <span>${serviceFees * days}</span>
          </div>
        </ListItem>
        <ListItem>
          <div className="reservation-details__list-item">
            <span>Taxes @ {taxRate}%</span>
            <span>${taxAmount()}</span>
          </div>
        </ListItem>
        <ListItem>
          <div className="reservation-details__list-item reservation-details__list-item--total">
            <span>Total</span>
            <span>${totalPrice()}</span>
          </div>
        </ListItem>
      </List>
    </div>
  );
};

export default ReservationDetail;