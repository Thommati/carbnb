import { useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  searchBox: {
    backgroundColor: "#ddd",
    padding: "30px",
    borderRadius: "8px",
  },
}));

function SearchBar(props) {
  const classes = useStyles();

  const [location, setLocation] = useState(props.state.location);
  const [fromDate, setFromDate] = useState(props.state.fromDate);
  const [toDate, setToDate] = useState(props.state.toDate);

  // when the global location changed (e.g PopularLocations clicked) it will update the internal state
  useEffect(() => {
    setLocation(props.state.location);
  }, [props.state.location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const handleSearchClick = () => {
    props.setState((prev) => {
      return { ...prev, location, fromDate, toDate };
    });
  };

  return (
    <Container className={classes.searchBox} maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth={true}>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                onChange={handleLocationChange}
              >
                <MenuItem value={"Vancouver"}>Vancouver</MenuItem>
                <MenuItem value={"Toronto"}>Toronto</MenuItem>
                <MenuItem value={"Calgary"}>Calgary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="from-date"
              label="From"
              value={fromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="to-date"
              label="To"
              value={toDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth={true}
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default SearchBar;
