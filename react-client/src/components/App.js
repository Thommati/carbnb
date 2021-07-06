import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";

import CarDetails from "./details-page/CarDetails";

import CarTheme from "./CarTheme";
import useApplicationData from "../hooks/ApplicationData";
import UserDashboard from "./user-dashboard/UserDashboard";

function App() {
  const { search, setSearch, setLocation, setFromDate, setToDate, cars } =
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
            <Route path="/user-dashboard">
              <UserDashboard />
            </Route>
            <Route path="/">
              <Home
                search={search}
                setSearch={setSearch}
                setLocation={setLocation}
                setFromDate={setFromDate}
                setToDate={setToDate}
                cars={cars}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    </CarTheme>
  );
}

export default App;
