import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";

import CarDetails from "./details-page/CarDetails";

import CarTheme from "./CarTheme";
import useApplicationData from "../hooks/ApplicationData";

function App() {
  const { state, setState, setLocation, setFromDate, setToDate } =
    useApplicationData();

  return (
    <CarTheme>
      <Router>
        <div>
          {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search-results">Search</Link>
            </li>
            <li>
              <Link to="/deatils-page">Car Details</Link>
            </li>
          </ul>
        </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/details-page">
              <CarDetails />
            </Route>
            {/* <Route path="/search-results">
              <SearchResults />
            </Route> */}
            <Route path="/">
              <Home
                state={state}
                setState={setState}
                setLocation={setLocation}
                setFromDate={setFromDate}
                setToDate={setToDate}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </CarTheme>
  );
}

export default App;
