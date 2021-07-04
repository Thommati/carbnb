import { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

function SearchBar() {
  const [location, setLocation] = useState("");

  const [fromDate, setFromdDate] = useState(new Date(tomorrow));
  const [toDate, setToDate] = useState(new Date(tomorrow));

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFromDateChange = (date) => {
    setFromdDate(date);
  };
  const handleToDateChange = (date) => {
    setToDate(date);
  };

  return (
    <Container maxWidth="sm">
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
                <MenuItem value={"Calgery"}>Calgery</MenuItem>
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
