import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { authContext } from '../../providers/authProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: '.5rem'
  },
  selectTextField: {
    width: '11rem',
    marginRight: '.5rem'
  }
}));

const colours = [
  'Beige',
  'Black',
  'Blue',
  'Brown',
  'Green',
  'Grey',
  'Orange',
  'Purple',
  'Red',
  'Silver',
  'White',
  'Yellow',
];

const fuels = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'Other'];

const RegisterVehicle = ({ open, close }) => {
  const classes = useStyles();
  const { auth, user } = useContext(authContext);

  const [errorMessage, setErrorMessage] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [modelYear, setModelYear] = useState(new Date().getFullYear());
  const [doors, setDoors] = useState('');  // might need to change this
  const [colour, setColour] = useState('');
  const [fuel, setFuel] = useState('');
  const [seats, setSeats] = useState(2);
  const [transmission, setTransmission] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [checkState, setCheckState] = useState({
    sport: false,
    luxury: false,
    truck: false,
    van: false,
    miniVan: false,
    rv: false,
    suv: false,
    convertible: false,
    economy: false,
    petFriendly: false
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationField, setLocationField] = useState('');
  const [shouldOpen, setShouldOpen] = useState(open);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(`/api/locations/user/${user.id}`);
        setLocations(response.data);
      } catch (err) {
        console.log('Error retrieving locations', err);
      }
    };

    if (auth && user.id) {
      getLocation();
    }
  }, [auth, user.id]);

  useEffect(() => {
    if (open && locations.length > 0 && auth) {
      setShouldOpen(true);
    }
  }, [open, locations, auth]);

  const handleSubmit = async event => {
    event.preventDefault();

    // TODO:  Disable the dialog if not logged in.
    if (!auth) {
      setErrorMessage('You must be logged in to register a vehicle');
      return;
    }

    const { petFriendly, sport, truck, van, miniVan, luxury, rv, suv, convertible, economy } = checkState;

    // Remove price after updating schema
    const content = {
      userId: user.id,
      locationId: 3,
      make,
      model,
      doors,
      colour,
      transmission,
      description,
      fuel,
      seats,
      image,
      petFriendly,
      sport,
      truck,
      van,
      miniVan,
      luxury,
      rv,
      suv,
      convertible,
      economy,
      modelYear,
      price: 0
    };

    try {
      const response = await axios.post('/api/cars', content);
      setSnackOpen(true);
      console.log(response.data);
    } catch (err) {
      console.log('Error registering new car', err);
    }
  };

  const handleClose = () => {
    setMake('');
    setModel('');
    close(false);
  };

  const handleCheckChange = event => {
    setCheckState({ ...checkState, [event.target.name]: event.target.checked });
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <div>
      <Dialog
        open={shouldOpen}
        onClose={handleClose}
        aria-labelledby="login-dialog"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="login-dialog">Register Vehicle</DialogTitle>
        <DialogContent>
          <form id="register-vehicle-form" onSubmit={handleSubmit}>

            {errorMessage && <DialogContentText>{errorMessage}</DialogContentText>}

            <TextField
              className={classes.textField}
              id="rvehicle-make"
              label="Make"
              variant="filled"
              value={make}
              onChange={event => setMake(event.target.value)}
              required
            />

            <TextField
              className={classes.textField}
              id="rvehicle-model"
              label="Model"
              variant="filled"
              value={model}
              onChange={event => setModel(event.target.value)}
              required
            />

            <TextField
              className={classes.textField}
              id="rvehicle-seats"
              label="Model Year"
              type="number"
              inputProps={{ min: 1900, max: (new Date().getFullYear() + 1), step: 1 }}
              variant="filled"
              value={modelYear}
              onChange={event => setModelYear(event.target.value)}
              required
            />

            <TextField
              className={classes.textField}
              id="rvehicle-seats"
              label="Number of Seats"
              type="number"
              inputProps={{ min: 1, step: 1 }}
              variant="filled"
              value={seats}
              onChange={event => setSeats(event.target.value)}
              required
            />

            <TextField
              className={classes.selectTextField}
              id="rvehicle-doors"
              select
              label="Number of Doors"
              value={doors}
              onChange={event => setDoors(event.target.value)}
              variant="filled"
              required
            >
              {[2, 4].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.selectTextField}
              id="rvehicle-colours"
              select
              label="Colour"
              value={colour}
              onChange={event => setColour(event.target.value)}
              variant="filled"
              required
            >
              {colours.map((col) => (
                <MenuItem key={col} value={col}>
                  {col}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.selectTextField}
              id="rvehicle-fuel"
              select
              label="Fuel"
              value={fuel}
              onChange={event => setFuel(event.target.value)}
              variant="filled"
              required
            >
              {fuels.map((f) => (
                <MenuItem key={f} value={f}>
                  {f}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              className={classes.selectTextField}
              id="rvehicle-location"
              select
              label="Location"
              value={locationField}
              onChange={event => setLocationField(event.target.value)}
              variant="filled"
              required
            >
              {locations.map((loc) => (
                <MenuItem key={loc.id} value={loc.id}>
                  {`${loc.street_number} ${loc.stree_name} ${loc.city}, ${loc.province}`}
                </MenuItem>
              ))}
            </TextField>

            <FormControl component="fieldset">
              <FormLabel component="legend">Transmission</FormLabel>
              <RadioGroup
                aria-label="transmission type"
                name="vtransmission"
                value={transmission}
                onChange={event => setTransmission(event.target.value)}
                row
              >
                <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
                <FormControlLabel value="manual" control={<Radio />} label="Manual" />
                <FormControlLabel value="dct" control={<Radio />} label="Dual Clutch" />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel component="legend">Vehicle Information</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox checked={checkState.sport} onChange={handleCheckChange} name="sport" />}
                  label="Sport"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.luxury} onChange={handleCheckChange} name="luxury" />}
                  label="Luxury"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.economy} onChange={handleCheckChange} name="economy" />}
                  label="Economy"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.truck} onChange={handleCheckChange} name="truck" />}
                  label="Truck"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.van} onChange={handleCheckChange} name="van" />}
                  label="Van"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.miniVan} onChange={handleCheckChange} name="miniVan" />}
                  label="Mini Van"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.rv} onChange={handleCheckChange} name="rv" />}
                  label="RV"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.suv} onChange={handleCheckChange} name="suv" />}
                  label="SUV"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.convertible} onChange={handleCheckChange} name="convertible" />}
                  label="Convertible"
                />
                <FormControlLabel
                  control={<Checkbox checked={checkState.petFriendly} onChange={handleCheckChange} name="petFriendly" />}
                  label="Pet Friendly"
                />
              </FormGroup>
            </FormControl>

            <TextField
              className={classes.textField}
              id="rvehicle-description"
              label="Description"
              variant="filled"
              inputProps={{ minLength: 10 }}
              value={description}
              onChange={event => setDescription(event.target.value)}
              multiline
              rows={3}
              fullWidth
              required
            />

            <TextField
              className={classes.textField}
              id="rvehicle-image"
              label="Image URL"
              variant="filled"
              value={image}
              onChange={event => setImage(event.target.value)}
              fullWidth
              required
            />

          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
          <Button type="submit" form="register-vehicle-form" variant="contained" color="secondary">
            Register
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleCloseSnack}>
        <MuiAlert onClose={handleCloseSnack} severity="success" elevation={6} variant="filled">
          Successfully registered new car
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default RegisterVehicle;
