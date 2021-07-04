import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import DetailsPage from "./DetailsPage";
import SearchResults from "./SearchResults";
import CarTheme from "./CarTheme";

function App() {
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
            <Route path="/deatils-page">
              <DetailsPage />
            </Route>
            <Route path="/search-results">
              <SearchResults />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </CarTheme>
  );
}

export default App;
