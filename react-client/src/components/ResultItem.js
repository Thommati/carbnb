import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function ResultItem(props) {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>{props.text}</Paper>
    </Grid>
  );
}
export default ResultItem;
