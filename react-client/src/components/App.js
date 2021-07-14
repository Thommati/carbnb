import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Footer from "./Footer";

import CarDetails from "./details-page/CarDetails";

import CarTheme from "./CarTheme";
import UserDashboard from "./user-dashboard/UserDashboard";

import HostDashboard from "./host-dashboard/HostDashboard";
import TopNav from "./TopNav";

import AppSide from './navigation/AppSide'

function App() {
  return (
    <CarTheme>
      <Router>
        <TopNav />
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/user-dashboard">
              <AppSide />
              <UserDashboard />
            </Route>
            <Route path="/host-dashboard">
              <AppSide />
              <HostDashboard />
            </Route>
            <Route path="/cars/:id">
              <CarDetails />
              <Footer />
            </Route>
            <Route path="/">
              <Home />
              <Footer />
            </Route>
          </Switch>
        </div>
      </Router>
    </CarTheme>
  );
}

export default App;
