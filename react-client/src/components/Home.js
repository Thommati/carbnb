import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";
import SearchResultsContainer from "./SearchResultsContainer";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  h: {
    borderTop: "2px solid #eeeef5",
    marginTop: "80px",
    textAlign: "center",
    paddingTop: "32px",
  },
}));

function Home(props) {
  const classes = useStyles();
  return (
    <div>
      Home
      <SearchBar
        search={props.search}
        setSearch={props.setSearch}
        setLocation={props.setLocation}
        setFromDate={props.setFromDate}
        setToDate={props.setToDate}
        filters={props.filters}
        setFilters={props.setFilters}
        setPets={props.setPets}
        setRv={props.setRv}
        setSport={props.setSport}
      />
      <p></p>
      {props.search.location === "" && (
        <div>
          <Container className={classes.h} maxWidth="sm">
            The Airbnb of the automotive world. bla bla
          </Container>
          <PopularLocations setLocation={props.setLocation} />
        </div>
      )}
      {props.search.location !== "" && (
        <div>
          <SearchResultsContainer
            cars={props.cars}
            setSelected={props.setSelected}
            clearSelected={props.clearSelected}
            filters={props.filters}
          />
        </div>
      )}
      <br />
    </div>
  );
}

export default Home;
