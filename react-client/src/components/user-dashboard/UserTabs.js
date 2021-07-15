import React from "react";
import MainContainer from "./MainContainer";
import Favourites from "./Favourites";
import PastBookings from "./PastBookings";

export default function UserTabs(props) {
  const value = props.tabValue;

  return (
    <div>
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
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
