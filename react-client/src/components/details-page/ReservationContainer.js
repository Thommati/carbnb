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

import './ReservationContainer.scss';

// TODO: Add submit reservation button logic
// TODO: Write a helper function to get a tax rate based off of location's province
// TODO: Remove hard-coded values from ReservationDetails and load from Container's props
const ReservationContainer = props => {
  const { auth, user } = useContext(authContext);
  const { price, province } = props;
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [numDays, setNumDays] = useState((props.endDate - props.startDate) / (24 * 60 * 60 * 1000) + 1);

  // for snackbars
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  const handleRangeSelection = range => {
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  };

  useEffect(() => {
    setNumDays(Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000) + 1));
  }, [startDate, endDate]);

  const handleSubmitReservation = async () => {
    try {
      // TODO: availability needs to be set properly
      // TODO: need to pull user data from authContext after it is written
      const response = await axios.post('/api/orders', {
        availabilityId: 1, // a proper id is required
        renterId: 2, // need to use the current user
        startDate,
        endDate,
        price // Needs to come from availability
      });

      if (response.status === 201) {
        setOpenSuccess(true);
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
    setOpenSuccess(false);
    setOpenFail(false);
  };

  return (
    <div className="reservation-container">
      <div>

        <DateRange
          ranges={[{ startDate, endDate, key: 'selection' }]}
          onChange={handleRangeSelection}
          scroll={{enabled: true}}
          minDate={new Date()}
          maxDate={addYears(new Date(), 1)}
        />


      </div>
      <Button variant="contained" color="primary" onClick={handleSubmitReservation}>
        Reserve
      </Button>
      <ReservationDetail
        price={price}
        days={numDays}
        serviceFees={pricingInfo.serviceFeesPerDay}
        taxRate={pricingInfo.tax[province]}
      />

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
