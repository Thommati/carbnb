import { useContext } from "react";
import { searchContext } from "../providers/SearchProvider";

import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";
import SearchResultsContainer from "./SearchResultsContainer";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchProvider from "../providers/SearchProvider";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  h: {
    borderTop: "2px solid #eeeef5",
    marginTop: "80px",
    textAlign: "center",
    paddingTop: "32px",
  },
  body1: {
    fontSize: "1.3rem"
  }
}));

//created the internalHome component to be able to wrap the useContext with a search provider
function Home(props) {
  return (
    <SearchProvider>
      <InternalHome />
    </SearchProvider>
  );
}

function InternalHome(props) {
  const classes = useStyles();
  const { search } = useContext(searchContext);

  return (
    <div>
      <SearchBar />
      <p></p>
      {search.location === "" && (
        <div>
          <Container className={classes.h} maxWidth="sm">
            <Typography variant="h4" color="primary" gutterBottom>Share My Ride, re-inventing car rentals.</Typography>
            <Typography variant="body1" className={classes.body1} paragraph>
              We offer a vast range of vehicles from sports cars to trucks and even RV's, for those perfect weekend getaways to enjoy the beautiful outdoors.
            </Typography>
            <Typography variant="h6">
              Get out of the ordinary and book your dream car today!
            </Typography>
          </Container>
          <PopularLocations />
        </div>
      )}
      {search.location !== "" && (
        <div>
          <SearchResultsContainer />
        </div>
      )}
      <br />
    </div>
  );
}

export default Home;
