import { List, ListItem } from '@material-ui/core';

import './ReservationDetail.scss';

const ReservationDetail = props => {
  const { price, days, serviceFees, taxRate } = props;

  const convertPriceToNumber = price => {
    if (price) {
      return price.split('$')[1];
    }
    return 0;
  };

  const taxAmount = () => (convertPriceToNumber(price) + serviceFees) * days * taxRate / 100;

  const totalPrice = () => (convertPriceToNumber(price) + serviceFees) * days + taxAmount();

  return (
    <div className="reservation-details">
      <List>
        <ListItem>
          <div className="reservation-details__list-item">
            <span>${convertPriceToNumber(price)} x {days} {days === 1 ? 'day' : 'days'}</span>
            <span>${convertPriceToNumber(price) * days}</span>
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
            <span>${(Math.round(taxAmount() * 100) / 100).toFixed(2)}</span>
          </div>
        </ListItem>
        <ListItem>
          <div className="reservation-details__list-item reservation-details__list-item--total">
            <span>Total</span>
            <span>${(Math.round(totalPrice() * 100) / 100).toFixed(2)}</span>
          </div>
        </ListItem>
      </List>
    </div>
  );
};

export default ReservationDetail;
