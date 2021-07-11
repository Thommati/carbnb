import "date-fns";
import React from "react";
import { useState, useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import Select from "@material-ui/core/Select";
import axios from "axios";
import { authContext } from "../../providers/authProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    // display: "flex",
    // alignItems: "center",
    flexgrow: 1,
  },
  Add: {
    fontSize: 30,
  },
  // button: {
  //   display: "block",
  //   marginTop: theme.spacing(2),
  // },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  // },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,  }
}));

export default function AddAvailability({ locations, updateAvailability }) {
  const { auth, user } = useContext(authContext);
  const classes = useStyles();

  const [usersCars, setUsersCars] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedCar, setSelectedCar] = useState('');
  const [deliver, setDeliver] = useState(false);
  const [price, setPrice] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
    setSelectedCar('');
    setDeliver(false);
    setPrice(0);
    setSelectedLocation('');
    setOpen(false);
  };

  const handleStartDateChange = (date) => {
    console.log('Date is being set', date);
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get(`/api/cars/users/${user.id}`);
        setUsersCars(response.data);
        handleClose();
      } catch (err) {
        console.log("Error getting available cars", err);
      }
    };
    if (user.id) {
      getCars();
    }
  }, [user]);

  const handleSubmit = async () => {
    console.log('handle submit called');
    if (!auth && user.id) {
      return;
    }

    const formData = {
      price,
      locationId: selectedLocation,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      delivery: deliver,
      carId: selectedCar,
    };

    try {
      const response = await axios.post('/api/availability', formData);
      handleClose();
      updateAvailability(response.data);
    } catch (err) {
      console.log('Error saving availability to database', err);
    }
  };

  return (
    <div className = {classes.root}>
      {auth && <AddCircleOutlineIcon
        className={classes.Add}
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-availability"
      >

        <DialogTitle id="add-availability">
          Add Vehicle Availability
        </DialogTitle>
        <DialogContent>

          <TextField
            id="car-select"
            select
            label="Select Car"
            value={selectedCar}
            onChange={event => setSelectedCar(event.target.value)}
            variant="filled"
            required
            fullWidth
          >
            {usersCars.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {`${c.id}: ${c.model_year} ${c.make} ${c.model}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField
              id="car-locations"
              select
              label="Select Location"
              value={selectedLocation}
              onChange={event => setSelectedLocation(event.target.value)}
              variant="filled"
              required
              fullWidth
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {`${loc.street_number} ${loc.street} ${loc.city}, ${loc.province}`}
                </MenuItem>
              ))}
            </TextField>
          <Grid container justifyContent="space-around">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-start"
                label="Available Start Date"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-end"
                label="Available End Date"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid>
            <TextField
              autoFocus
              margin="dense"
              id="price"
              label="Price / Day"
              type="number"
              inputProps={{ min: 1, step: 1 }}
              placeholder="$"
              fullWidth
              value={price}
              onChange={event => setPrice(event.target.value)}
            />



          </Grid>
        </DialogContent>
        <FormControl>
          <FormControlLabel
            control={<Checkbox checked={deliver} onChange={event => setDeliver(event.target.checked)} name="sport" />}
            label="Delivery"
          />
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
