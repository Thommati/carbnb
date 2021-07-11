import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    display: 'flex',
    alignItems: 'center',
  },
  Add: {
    fontSize: 30
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function MaterialUIPickers() {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2021-08-18T21:11:54'));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2021-08-18T21:11:54'));
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');

  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
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


  return (
    <div>
    <AddCircleOutlineIcon className={classes.Add} onClick={handleClickOpen} style={{cursor: 'pointer'}}/>
    <Dialog open={open} onClose={handleClose} aria-labelledby="add-availability">
        <DialogTitle id="add-availability">Add Vehicle Availability</DialogTitle>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DialogContent>

        <Button className={classes.button} onClick={handleOpen}>
        Select Vehicle
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={10}>Car 1</MenuItem>
          <MenuItem value={20}>Car 2</MenuItem>
        </Select>
      </FormControl>

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
            'aria-label': 'change date',
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
              'aria-label': 'change date',
          }}
        />

      </Grid>
      <Grid>
      <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price / Day"
            type="text"
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
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
    </Dialog>

    </div>
  );
}
