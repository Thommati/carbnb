import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ResultItem from "./ResultItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    // backgroundColor: "#ddd",
    padding: "0",
    // borderRadius: "8px",
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
  formControlRight: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
    float: "right",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SearchResultsContainer() {
  const classes = useStyles();
  // const [sortBy, setSortBy] = useState("Low To High");

  // const handleSortBy = (event) => {
  //   setSortBy(event.target.value);
  // };

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 33].map((n) => {
    return <ResultItem text={n}></ResultItem>;
  });

  return (
    <Container className={classes.searchBox} maxWidth="sm">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={sortBy}
          // onChange={handleSortBy}
          label="Sort By"
        >
          <MenuItem>Low To High</MenuItem>
          <MenuItem>High To Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControlRight}>
        <InputLabel id="demo-simple-select-outlined-label">Filters</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          // value={sortBy}
          // onChange={handleSortBy}
          label="Filters"
        >
          <MenuItem>Make</MenuItem>
          <MenuItem>Model</MenuItem>
          <MenuItem>Doors</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        {rows}
      </Grid>
    </Container>
  );
}

export default SearchResultsContainer;
