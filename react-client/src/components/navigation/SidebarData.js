import React from 'react';

import ChatIcon from '@material-ui/icons/Chat';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from "@material-ui/icons/Home";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const SidebarData = [
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
  },
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/"
  },
  {
    title: "New Bookings",
    icon: <DashboardIcon />,
    link: "/user-dashboard"
  },
  {
    title: "Past Booking",
    icon: <DashboardIcon />,
    link: "/"
  },
  {
    title: "Favourites",
    icon: <FavoriteBorderIcon />,
    link: "/"
  },
  {
    title: "New Bookings",
    icon: <DashboardIcon />,
    link: "/"
  },
  {
    title: "Past Bookings",
    icon: <DashboardIcon />,
    link: "/"
  },
  {
    title: "Vehicle Availabiliy",
    icon: <EventAvailableIcon />,
    link: "/"
  },
  {
    title: "My Vehicles",
    icon: <DriveEtaIcon />,
    link: "/"
  },
  {
    title: "Messages",
    icon: <ChatIcon />,
    link: "/"
  },
]
