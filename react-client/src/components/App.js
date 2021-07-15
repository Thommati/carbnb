import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Footer from "./Footer";

import CarDetails from "./details-page/CarDetails";

import CarTheme from "./CarTheme";

import MainContainer from "./user-dashboard/MainContainer";
import Favourites from "./user-dashboard/Favourites";
import PastBookings from "./user-dashboard/PastBookings";

import NewBookings from "./host-dashboard/NewBookings";
import PastBooking from "./host-dashboard/PastBookings";
import VehicleAvailability from "./host-dashboard/VehicleAvailability";
import RegisterVehicle from "./host-dashboard/RegisterVehicle";


import HostDashboard from "./host-dashboard/HostDashboard";
import TopNav from "./TopNav";

import AppSide from "./navigation/AppSide"

function App() {
  return (
    <CarTheme>
      <Router>
        <TopNav />
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/cars/:id">
              <CarDetails />
              <Footer></Footer>
            </Route>

            <Route path="/user-dashboard/">
              <AppSide />
              <MainContainer />
            </Route>

            <Route path="/user-pastbookings">
              <AppSide />
              <PastBookings />
            </Route>

            <Route path="/user-favourites">
              <AppSide />
              <Favourites />
            </Route>

            <Route path="/host-dashboard">
              <AppSide />
              <HostDashboard />
            </Route>
{/*
            <Route path="/host-dashboard">
              <AppSide />
              <NewBookings />
            </Route>

            <Route path="/host-pastbookings">
              <AppSide />
              <PastBooking />
            </Route>

            <Route path="/host-availability">
              <AppSide />
              <VehicleAvailability />
            </Route>

            <Route path="/host-vehicle">
              <AppSide />
              <RegisterVehicle />
            </Route> */}

            <Route path="/">
              <Home />
            <Footer></Footer>
            </Route>
          </Switch>
        </div>
      </Router>
    </CarTheme>
  );
}

export default App;
