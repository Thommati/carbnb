import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ResultItem from "./ResultItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  searchBox: {
    backgroundColor: "#ddd",
    padding: "30px",
    borderRadius: "8px",
  },
}));

function SearchResultsContainer() {
  const classes = useStyles();

  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 33].map((n) => {
    return <ResultItem text={n}></ResultItem>;
  });

  return (
    <Container className={classes.searchBox} maxWidth="sm">
      <Grid container spacing={1}>
        {rows}
      </Grid>
    </Container>
  );
}

export default SearchResultsContainer;
