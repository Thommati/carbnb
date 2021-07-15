import { Link } from "react-router-dom";
import { useContext } from "react";

import { searchContext } from "../providers/SearchProvider";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Favorite from "@material-ui/icons/Favorite";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { purple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "280px",
    backgroundColor: "#99e4ee",
    padding: theme.spacing(1),
    boxShadow: theme.shadows[5],
    // textAlign: "center",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "& > span": {
      textDecoration: "none",
    },
  },
  img: {
    width: "100%",
  },
  imageWrapper: {
    height: "160px",
    overflow: "hidden",
    marginBottom: "4px",
  },
  h: {
    fontWeight: "bold",
  },
  fav: {
    color: purple[600],
  },
  clear: {
    clear: "both",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function ResultItem(props) {
  const { addFavourite, removeFavourite, search } = useContext(searchContext);

  const classes = useStyles();

  const handleFavoriteChange = (event) => {
    if (event.target.checked) {
      addFavourite(props.car.id);
    } else {
      removeFavourite(props.car.id);
    }
  };

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite className={classes.fav} />}
              name="checkedH"
              checked={props.fav}
              onChange={handleFavoriteChange}
            />
          }
        />
        <Link
          to={{
            pathname: `/cars/${props.car.id}`,
            initialDates: {
              from: search.fromDate,
              to: search.toDate
            }
          }}
          className={classes.link}
        >
          <div className={classes.imageWrapper}>
            <img
              className={classes.img}
              src={props.car.image}
              alt={props.car.make + " " + props.car.model}
            />
            <div className={classes.clear}></div>
          </div>
          <span className={classes.h}>
            {props.car.make} {props.car.model}
          </span>
          <br />
          <span>{props.car.price}/day</span>
          <br />
        </Link>
      </Paper>
    </Grid>
  );
}
export default ResultItem;
