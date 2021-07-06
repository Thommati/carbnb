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
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <FavoriteBorderIcon className={classes.fav} />
        <img
          className={classes.img}
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Porsche"
        />
        <span className={classes.h}>Porsche 2020</span>
        <br />
        <span>4.9 stars</span>
      </Paper>
    </Grid>
  );
}
export default ResultItem;
