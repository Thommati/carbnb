import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Tabs,
  Tab,
  AppBar
} from '@material-ui/core'
import NewBookings from "./NewBookings";
import PastBookings from "./PastBookings";
import VehicleAvailability from "./VehicleAvailability";
import RegisterVehicle from "./RegisterVehicle";

import { authContext } from '../../providers/authProvider';

export default function UserTabs () {
  const { auth, user } =  useContext(authContext);
  const [value,setValue] = useState(0);
  const [locations, setLocations] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleTabs=(e, value) => {
  setValue(value);
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get(`/api/locations/user/${user.id}`);
        setLocations(response.data);
      } catch (err) {
        console.log('Error retrieving locations', err);
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
        console.error('Error retrieving order by host id', error);
      }
    }
    getOrders();
  }, [user.id]);

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
