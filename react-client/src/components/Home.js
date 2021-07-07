import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";
import SearchResultsContainer from "./SearchResultsContainer";
import Footer from "./footer";

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
        filters={props.filters}
        setFilters={props.setFilters}
        setPets={props.setPets}
        setRv={props.setRv}
        setSport={props.setSport}
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
          <SearchResultsContainer
            cars={props.cars}
            setSelected={props.setSelected}
            clearSelected={props.clearSelected}
            filters={props.filters}
          />
        </div>
      )}
      <br />
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Home;
