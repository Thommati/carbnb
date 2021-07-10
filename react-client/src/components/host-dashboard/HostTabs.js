import React from 'react';
import {
  Tabs,
  Tab,
  AppBar
} from '@material-ui/core'
import NewBookings from "./NewBookings";
import PastBookings from "./PastBookings";
import VehicleAvailability from "./VehicleAvailability";
import RegisterVehicle from "./RegisterVehicle";

export default function UserTabs () {
  const [value,setValue]=React.useState(0);
  const handleTabs=(e, value) => {
  setValue(value);
  }
  return (
    <div>
      <AppBar position="static" >
        <Tabs value={value} onChange={handleTabs}>
          <Tab label="New Bookings" />
          <Tab label="Past Bookings" />
          <Tab label="Vehicle Availability" />
          <Tab label="Register Vehicle" />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <NewBookings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastBookings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VehicleAvailability />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RegisterVehicle />
      </TabPanel>
    </div>
  );
};

function TabPanel(props) {
  const {children, value, index}=props;
  return (
    <div>
      {
        value === index && (
          <h1>{children}</h1>
        )
      }
    </div>
  );
};
