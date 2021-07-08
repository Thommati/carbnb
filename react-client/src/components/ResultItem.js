import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "280px",
    backgroundColor: "#eeeef5",
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
  },
  h: {
    fontWeight: "bold",
  },
  fav: {
    alignContent: "",
  },
  clear: {
    clear: "both",
  },
}));

function ResultItem(props) {
  const classes = useStyles();

  const handleClickSetSelected = (event) => {
    props.setSelected(props.car.id);
  };

  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <FavoriteBorderIcon className={classes.fav} />
        <Link to={`/cars/${props.car.id}`}>
          <div className={classes.imageWrapper}>
            <img
              className={classes.img}
              src={props.car.image}
              alt={props.car.make + " " + props.car.model}
              onClick={handleClickSetSelected}
            />
            <div className={classes.clear}></div>
          </div>
          <span className={classes.h}>
            {props.car.make} {props.car.model}
          </span>
          <br />
          <span>${props.car.price}/day</span>
          <br />
          <span>4.9 stars</span>
        </Link>
      </Paper>
    </Grid>
  );
}
export default ResultItem;
