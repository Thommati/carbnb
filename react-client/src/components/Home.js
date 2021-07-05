import SearchBar from "./SearchBar";
import PopularLocations from "./PopularLocations";

function Home(props) {
  return (
    <div>
      Home
      <SearchBar
        state={props.state}
        setState={props.setState}
        setLocation={props.setLocation}
        setFromDate={props.setFromDate}
        setToDate={props.setToDate}
      />
      <p></p>
      {props.state.location === "" && (
        <div>
          <div>The Airbnb of the automotive world. bla bla</div>
          <PopularLocations setLocation={props.setLocation} />
        </div>
      )}
    </div>
  );
}

export default Home;
