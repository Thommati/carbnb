import React from 'react';
import {
  Tabs,
  Tab,
  AppBar
} from '@material-ui/core'
import MainContainer from "./MainContainer";
import Favourites from "./Favourites";
import PastBookings from "./PastBookings";

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
          <Tab label="Favourites" />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MainContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastBookings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Favourites />
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
          <div>{children}</div>
        )
      }
    </div>
  );
};
