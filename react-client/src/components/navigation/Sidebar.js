import { Avatar, Divider } from '@material-ui/core';
import { DomainPropTypes } from '@material-ui/pickers/constants/prop-types';
import React, { useState } from 'react';
import './App.css';
import {SidebarData, User, Host} from './SidebarData';
import { useLocation } from 'react-router-dom';

function Sidebar(props) {
  let location = useLocation();
  return (
    <div className="Sidebar">
      <ul className="ProfileName">
        <Avatar />
      </ul>
      <ul className="ProfileName">
        My Name
      </ul>
      <ul className="Divider">
        <Divider />
      </ul>

      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick = {() => {
                window.location.pathname = val.link;
              }}
            >
              {""}
              <div id="icon">
                {val.icon}
              </div>
              {""}
              <div id="title">
                {val.title}
              </div>
            </li>
          );
        })}
      </ul>

      {location.pathname === "/user-dashboard" &&
      <>
      <ul className="Heading">
        USER DASHBOARD
      </ul>

      <ul className="UserList">
        {User.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={location.pathname === val.link ? "active" : ""}
              onClick = {() => {
                props.tabChange(key);
              }}
            >
              {""}
              <div id="icon">
                {val.icon}
              </div>
              {""}
              <div id="title">
                {val.title}
              </div>
            </li>
          );
        })}
      </ul>
      </>}

      {location.pathname === "/host-dashboard" &&
      <>
       <ul className="Heading">
        HOST DASHBOARD
      </ul>

      <ul className="HostList">
        {Host.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={location.pathname === val.link ? "active" : ""}
              onClick = {() => {
                props.tabChange(key);
              }}

            >
              {""}
              <div id="icon">
                {val.icon}
              </div>
              {""}
              <div id="title">
                {val.title}
              </div>
            </li>
          );
        })}
      </ul>
      </>}
    </div>
  )
}

export default Sidebar;
