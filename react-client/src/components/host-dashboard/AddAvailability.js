import "date-fns";
import React from "react";
import { useState, useContext, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  FormControlLabel,
  TextField,
  MenuItem,
  FormControl,
  Checkbox,
  Select,
  InputLabel,
  Container,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import axios from "axios";
import { authContext } from "../../providers/authProvider";

const useStyles = makeStyles((theme) => ({
  add: {
    fontSize: 30,
  },
  avail: {
    padding: "20px",
    borderRadius: "15px",
    boxShadow: theme.shadows[5],
  },
  title: {
    marginBottom: "30px",
    padding: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "12pt",
  },
  buttoncancel: {
    padding: "10px",
    fontSize: "12pt",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddAvailability({ locations, updateAvailability }) {
  const { auth, user } = useContext(authContext);
  const classes = useStyles();

  const [usersCars, setUsersCars] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedCar, setSelectedCar] = useState("");
  const [deliver, setDeliver] = useState(false);
  const [price, setPrice] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
    setSelectedCar("");
    setDeliver(false);
    setPrice(0);
    setSelectedLocation("");
    setOpen(false);
  };

  const handleStartDateChange = (date) => {
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
  }, [user.id]);

  const handleSubmit = async () => {
    console.log("handle submit called");
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
      const response = await axios.post("/api/availability", formData);
      handleClose();
      updateAvailability(response.data);
    } catch (err) {
      console.log("Error saving availability to database", err);
    }
  };

  return (
    <div className={classes.addAvail}>
      {auth && (
        <AddCircleOutlineIcon
          className={classes.Add}
          onClick={handleClickOpen}
          style={{ cursor: "pointer" }}
        />
      )}
      <Dialog
        className={classes.paper}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-availability"
        disableEnforceFocus
      >
        <Container className={classes.avail} maxWidth="sm">
          <DialogTitle id="add-availability" className={classes.title}>
            Add Vehicle Availability
          </DialogTitle>
          <Grid container spacing={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">
                    Select Vehicle
                  </InputLabel>
                  <Select
                    id="car-select"
                    labelId="Select Car"
                    value={selectedCar}
                    onChange={(event) => setSelectedCar(event.target.value)}
                    required
                  >
                    {usersCars.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {`${c.id}: ${c.model_year} ${c.make} ${c.model}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-simple-select-label">
                    Select Location
                  </InputLabel>
                  <Select
                    id="car-locations"
                    labelId="Select Location"
                    value={selectedLocation}
                    onChange={(event) =>
                      setSelectedLocation(event.target.value)
                    }
                    required
                  >
                    {locations.map((loc) => (
                      <MenuItem
                        key={loc.id}
                        value={loc.id}
                      >{`${loc.street_number} ${loc.street} ${loc.city}, ${loc.province}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
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
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={6}>
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
                  fullWidth={true}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="price"
                  label="Price / Day ($)"
                  type="number"
                  inputProps={{ min: 1, step: 5 }}
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  fullWidth={true}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={deliver}
                      onChange={(event) => setDeliver(event.target.checked)}
                      name="Deliver"
                    />
                  }
                  label="Delivery"
                />
              </Grid>

              <Grid item xs={3}></Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Button
                  className={classes.buttoncancel}
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={handleClose}
                  style={{ borderRadius: 5 }}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={3}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  onClick={handleSubmit}
                  style={{ borderRadius: 5 }}
                >
                  Submit
                </Button>
              </Grid>
            </MuiPickersUtilsProvider>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
