import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";
import SearchResultsContainer from "./SearchResultsContainer";

function Home(props) {
  return (
    <div>
      Home
      <SearchBar
        search={props.search}
        setSearch={props.setSearch}
        setLocation={props.setLocation}
        setFromDate={props.setFromDate}
        setToDate={props.setToDate}
      />
      <p></p>
      {props.search.location === "" && (
        <div>
          <div>The Airbnb of the automotive world. bla bla</div>
          <PopularLocations setLocation={props.setLocation} />
        </div>
      )}
      {props.search.location !== "" && (
        <div>
          <SearchResultsContainer />
        </div>
      )}
    </div>
  );
}

export default Home;
