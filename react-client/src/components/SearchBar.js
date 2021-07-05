import { useState } from "react";
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

  const handleLocationChange = (event) => {
    props.setLocation(event.target.value);
  };

  const handleFromDateChange = (date) => {
    props.setFromDate(date);
  };
  const handleToDateChange = (date) => {
    props.setToDate(date);
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
                value={props.state.location}
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
              value={props.state.fromDate}
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
              value={props.state.toDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth={true}>
              Search
            </Button>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </Container>
  );
}

export default SearchBar;
