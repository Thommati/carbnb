import { useContext } from "react";
import { searchContext } from "../providers/SearchProvider";

import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";
import SearchResultsContainer from "./SearchResultsContainer";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchProvider from "../providers/SearchProvider";

const useStyles = makeStyles((theme) => ({
  h: {
    borderTop: "2px solid #eeeef5",
    marginTop: "80px",
    textAlign: "center",
    paddingTop: "32px",
  },
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
            The Airbnb of the automotive world. bla bla
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
