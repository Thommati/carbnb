import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#ddd",
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  img: {
    width: "100%",
  },
  h: {
    fontWeight: "bold",
  },
  fav: {
    alignContent: "",
  },
}));

function ResultItem(props) {
  const classes = useStyles();

  const handleClickSetSelected = (event) => {
    props.setSelected(props.car.id);
  };

  // const handleclearSelected = () => {
  //   clearSelected();
  // };

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <FavoriteBorderIcon className={classes.fav} />
        <img
          className={classes.img}
          src={props.car.image}
          alt={props.car.make + " " + props.car.model}
          onClick={handleClickSetSelected}
        />
        <span className={classes.h}>
          {props.car.make} {props.car.model}
        </span>
        <br />
        <span>${props.car.price}/day</span>
        <br />
        <span>4.9 stars</span>
      </Paper>
    </Grid>
  );
}
export default ResultItem;
