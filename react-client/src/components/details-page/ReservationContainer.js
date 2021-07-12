import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

// Material UI imports
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Imports for date range picker
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { addYears } from 'date-fns';

// Components and other project files
import ReservationDetail from './ReservationDetail';
import pricingInfo from '../../helpers/pricing';
import { authContext } from '../../providers/authProvider';
import { getMinAndMaxDates, getListingIdForOrder } from '../../helpers/listing-helpers';

import './ReservationContainer.scss';

// TODO: Add submit reservation button logic
// TODO: Remove hard-coded values from ReservationDetails
const ReservationContainer = (props) => {
  const { car, listings, orders } = props.carData;
  const { setCarData, initialDates } = props;

  const { auth, user } = useContext(authContext);

  // The start and end dates of the selected range of dates
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Number of days selected
  const [numDays, setNumDays] = useState((endDate - startDate) / (24 * 60 * 60 * 1000) + 1);

  // The minimum and maximum dates displayed by the date range picker
  const [minAvailableDate, setMinAvailableDate] = useState(new Date());
  const [maxAvailableDate, setMaxAvailableDate] = useState(addYears(new Date(), 1));

  // The dates in between the minimum and maximum available that will be disabled due
  // to lo listing available for those dates.
  const [disabledDates, setDisabledDates] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState(0);

  // for snackbars
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  const handleRangeSelection = range => {
    // Get the price based on which listing the order selection is in
    const { listingPrice } = getListingIdForOrder(
      listings,
      {
        startDate: range.selection.startDate,
        endDate: range.selection.endDate
      }
    );
    setSelectedPrice(listingPrice);

    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  };

  useEffect(() => {
    setNumDays(Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000) + 1));
  }, [startDate, endDate]);

  // Set min and max available dates whenever listings change.
  useEffect(() => {
    let minDate = null;
    let maxDate= null;
    let disabledDates = null;

    if (listings) {
      ({ minDate, maxDate, disabledDates } = getMinAndMaxDates(listings, orders));
    }

    let from = null;
    let to = null;
    if (initialDates) {
      ({from, to} = initialDates);
    }

    if (minDate && maxDate) {
      setMinAvailableDate(minDate);
      setMaxAvailableDate(maxDate);
      setStartDate(from || minDate);
      setEndDate(to || minDate);
      setDisabledDates(disabledDates);
    }

    // Set the displayed price
    const { listingPrice } = getListingIdForOrder(
      listings,
      {
        startDate: (from || minDate),
        endDate: (to || minDate)
      }
    );

    setSelectedPrice(listingPrice);
  }, [listings, orders, initialDates]);

  const handleSubmitReservation = async () => {
    try {
      const { listingId, listingPrice } = getListingIdForOrder(listings, { startDate, endDate });
      const order = {
        renterId: user.id,
        startDate,
        endDate,
        availabilityId: listingId,
        price: listingPrice
      };

      const response = await axios.post('/api/orders', order);

      if (response.status === 201) {
        // Snackbar confirmation
        setOpenSuccess(true);

        // Add the new order to the list of orders to update the date range picker
        const newOrdersList = [...orders, { id: order.id, start_date: order.startDate, end_date: order.endDate }];
        setCarData(prev => ({...prev, orders: newOrdersList }));
      } else {
        setOpenFail(true);
      }
    } catch (err) {
      console.error(err);
      setOpenFail(true);
    }
  };

  // Snackbar close handler
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    openSuccess && setOpenSuccess(false);
    openFail && setOpenFail(false);
  };

  // TODO:  user correct price below
  return (
    <div className="reservation-container">

      {listings && listings.length > 0 && <>
        <div>
          <DateRange
            ranges={[{ startDate, endDate, key: 'selection' }]}
            onChange={handleRangeSelection}
            scroll={{enabled: true}}
            minDate={minAvailableDate || new Date()}
            maxDate={maxAvailableDate}
            disabledDates={disabledDates}
          />
        </div>

        <Button variant="contained" color="primary" onClick={handleSubmitReservation} disabled={!auth}>
          {auth && 'Reserve'}
          {!auth && 'Login to Book'}
        </Button>

        <ReservationDetail
          price={selectedPrice}
          days={numDays}
          serviceFees={pricingInfo.serviceFeesPerDay}
          taxRate={pricingInfo.tax[car.province]}
        />
      </>}

      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" elevation={6} variant="filled">
          Reservation created successfully
        </MuiAlert>
      </Snackbar>

      <Snackbar open={openFail} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled">
          Failed to create reservation
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default ReservationContainer;
