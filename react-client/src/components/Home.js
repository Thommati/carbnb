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
      <PopularLocations setLocation={props.setLocation} />
    </div>
  );
}

export default Home;
