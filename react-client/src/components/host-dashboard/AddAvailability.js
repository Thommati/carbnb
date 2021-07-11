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
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import { authContext } from "../../providers/authProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    display: "flex",
    alignItems: "center",
  },
  Add: {
    fontSize: 30,
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function AddAvailability() {
  const { auth, user } = useContext(authContext);
  const classes = useStyles();
  const [selectedStartDate, setSelectedStartDate] = React.useState(
    new Date("2021-08-18T21:11:54")
  );
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    new Date("2021-08-18T21:11:54")
  );
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState("");
  const [selectedCar, setSelectedCar] = useState('');
  const [listings, setListings]  = useState([]);
  const [usersCars, setUsersCars] = useState([]);

  const handleChange = (event) => {
    setCar(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
      } catch (err) {
        console.log("Error getting available cars", err);
      }
    };
    if (user.id) {
      getCars();
    }
  }, [user]);

  const handleSubmit = () => {
    console.log("handleSubmit called");
  };

  return (
    <div>
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DialogContent>

          <TextField
              id="car-select"
              select
              label="Select Car"
              value={selectedCar}
              onChange={event => setSelectedCar(event.target.value)}
              variant="filled"
              required
            >
              {usersCars.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {`${c.id}: ${c.model_year} ${c.make} ${c.model}`}
                </MenuItem>
              ))}
            </TextField>

            <Grid container justifyContent="space-around">
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
              />
              <TextField
                autoFocus
                margin="dense"
                id="location"
                label="Location"
                type="text"
                fullWidth
              />
            </Grid>
          </DialogContent>
        </MuiPickersUtilsProvider>
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
