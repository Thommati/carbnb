import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NewBookings from "./NewBookings";
import PastBookings from "./PastBookings";
import VehicleAvailability from "./VehicleAvailability";
import RegisterVehicle from "./RegisterVehicle";

import { authContext } from "../../providers/authProvider";

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
  const { auth, user } = useContext(authContext);

  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [locations, setLocations] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleTabs = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(`/api/locations/user/${user.id}`);
        setLocations(response.data);
      } catch (err) {
        console.log("Error retrieving locations", err);
      }
    };

    if (auth && user.id) {
      getLocation();
    }
  }, [auth, user.id]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`/api/orders/host/${user.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error retrieving order by host id", error);
      }
    };
    getOrders();
  }, [user.id]);

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
          Vehicle Availaility
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTabs(3);
          }}
        >
          Register Vehicle
        </Button>
      </div>
      <TabPanel value={value} index={0}>
        <NewBookings orders={orders} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastBookings orders={orders} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VehicleAvailability locations={locations} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RegisterVehicle locations={locations} />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <div>{value === index && <div>{children}</div>}</div>;
}
