import React from 'react';
import {
  Tabs,
  Tab,
  AppBar
} from '@material-ui/core'
import MainContainer from "./MainContainer";


export default function AdminTabs () {
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
        Bookings
      </TabPanel>
      <TabPanel value={value} index={1}>
        Past Bookings
      </TabPanel>
      <TabPanel value={value} index={2}>
        Favourites
      </TabPanel>
      <TabPanel value={value} index={3}>
        Register Vehicle
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
