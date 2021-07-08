import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Footer from "./Footer";

import CarDetails from "./details-page/CarDetails";

import CarTheme from "./CarTheme";
import useApplicationData from "../hooks/ApplicationData";
import UserDashboard from "./user-dashboard/UserDashboard";
import TopNav from './TopNav';

function App() {
  const {
    search,
    setSearch,
    setLocation,
    setFromDate,
    setToDate,
    filters,
    setFilters,
    setPets,
    setRv,
    setSport,
    cars,
    setSelected,
    clearSelected,
  } = useApplicationData();

  return (
    <CarTheme>
      <Router>
        <TopNav/>
        <div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/cars/:id">
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
                setSelected={setSelected}
                clearSelected={clearSelected}
                filters={filters}
                setFilters={setFilters}
                setPets={setPets}
                setRv={setRv}
                setSport={setSport}
              />
            </Route>
          </Switch>
        </div>
      </Router>
      <div>
        <Footer></Footer>
      </div>
    </CarTheme>
  );
}

export default App;
