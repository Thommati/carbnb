import { useEffect, useState } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';

import ReservationDetail from './ReservationDetail';

import './ReservationContainer.scss';

// TODO: Add submit reservation button logic
// TODO: Write a helper function to get a tax rate based off of location's province
// TODO: Remove hard-coded values from ReservationDetails and load from Container's props
const ReservationContainer = props => {
  const [startDate, setStartDate] = useState(props.startDate);
  const [endDate, setEndDate] = useState(props.endDate);
  const [numDays, setNumDays] = useState((props.endDate - props.startDate) / (24 * 60 * 60 * 1000) + 1);

  const handleSelectStartDate = date => {
    setStartDate(date);
  };

  const handleSelectEndDate = date => {
    setEndDate(date);
  };

  useEffect(() => {
    setNumDays((endDate - startDate) / (24 * 60 * 60 * 1000) + 1);
  }, [startDate, endDate]);

  return (
    <div className="reservation-container">
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="start-date-picker"
            label="Start Date"
            format="dd/MM/yyyy"
            value={startDate}
            onChange={handleSelectStartDate}
            KeyboardButtonProps={{
              'aria-label': 'change start date',
            }}
            className="reservation-container__date-picker"
            disablePast
          />
          <KeyboardDatePicker
            margin="normal"
            id="end-date-picker"
            label="End Date"
            format="dd/MM/yyyy"
            value={endDate}
            onChange={handleSelectEndDate}
            KeyboardButtonProps={{
              'aria-label': 'change end date',
            }}
            className="reservation-container__date-picker"
            disablePast
          />
        </MuiPickersUtilsProvider>
      </div>
      <Button variant="contained" color="primary" onClick={() => { alert('handle click not implemented') }}>
        Reserve
      </Button>
      <ReservationDetail price={props.price} days={numDays} serviceFees={20} taxRate={5} />
    </div>
  );
};

export default ReservationContainer;
