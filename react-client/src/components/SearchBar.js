import { useState, useEffect, Fragment } from "react";

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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
    // maxWidth: "800px",
  },
}));

function SearchBar(props) {
  const classes = useStyles();

  const [location, setLocation] = useState(props.search.location);
  const [fromDate, setFromDate] = useState(props.search.fromDate);
  const [toDate, setToDate] = useState(props.search.toDate);

  // when the global location changed (e.g PopularLocations clicked) it will update the internal search
  useEffect(() => {
    setLocation(props.search.location);
  }, [props.search.location]);

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
    props.setSearch((prev) => {
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

          {props.search.location !== "" && (
            <Fragment>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.filters.pets}
                      onChange={() => props.setPets(!props.filters.pets)}
                      name="petCb"
                      color="primary"
                    />
                  }
                  label="Pet Friendly"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.filters.rv}
                      onChange={() => props.setRv(!props.filters.rv)}
                      name="rvCb"
                      color="primary"
                    />
                  }
                  label="RV's Only"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.filters.sport}
                      onChange={() => props.setSport(!props.filters.sport)}
                      name="sportCb"
                      color="primary"
                    />
                  }
                  label="Sport"
                />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default SearchBar;
