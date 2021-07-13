import React, { useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ChatIcon from '@material-ui/icons/Chat';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from "@material-ui/icons/Home";

import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Router, Route, Link } from "react-router-dom";


import UserDashboard from "../user-dashboard/UserDashboard";
import TopNav from '../TopNav';
// import Footer from '../Footer';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
  background: '#f9f9f9',
  width: '100%',
  padding: theme.spacing(3)
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    background: '#c2eafc'
  },
  title: {
    paddingTop: theme.spacing(10),
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBarNav({ children }) {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const [component, setComponent] = useState('user')

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon color="primary" />,
      path: '/'
    },
    {
      text: "User Dashboard",
      icon: <DashboardIcon color="primary" />,
      path: '/user-dashboard'
    },
    {
      text: "Host Dashboard",
      icon: <DashboardIcon color="primary" />,
      path: '/host-dashboard'
    },
    {
      text: "Messages",
      icon: <ChatIcon color="primary" />,
      path: '/'
    },
  ]
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
       <TopNav/>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            User Profile
          </Typography>
        </div>

        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Divider />
          </List>
          <List>
            {menuItems.map(item => (

              <ListItem
                button
                key ={item.text}
                onClick={() => history.push(item.path)}
                className={location.pathname == item.path ? classes.active : null}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <main className={classes.content}>
        <Route exact path="/user-dashboard" component={UserDashboard} />
    </main>
    </div>
  );
}

