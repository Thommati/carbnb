import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MainContainer from "./MainContainer";
import Favourites from "./Favourites";
import PastBookings from "./PastBookings";

const useStyles = makeStyles((theme) => ({
  tabs: {
    minWidth: 650,
    "& > button": {
      borderRadius: "0px",
      boxShadow: "none",
      borderRight: "solid 1px gray",
    },
    borderTop: "solid 1px gray",
    background: theme.palette.primary.main,
  },
}));

export default function UserTabs() {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleTabs = (value) => {
    setValue(value);
  };
  return (
    <div>
      <div className={classes.tabs}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTabs(0);
          }}
        >
          New Bookings
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTabs(1);
          }}
        >
          Past Bookings
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTabs(2);
          }}
        >
          Favourites
        </Button>
      </div>
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
