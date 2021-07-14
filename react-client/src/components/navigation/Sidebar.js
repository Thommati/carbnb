import { Avatar, Divider } from '@material-ui/core';
import React from 'react';
import './App.css';
import {SidebarData, User, Host} from './SidebarData'

function Sidebar() {
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
              id={window.location.pathname == val.link ? "active" : ""}
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

      <ul className="Heading">
        USER DASHBOARD
      </ul>

      <ul className="UserList">
        {User.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
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

      <ul className="Heading">
        HOST DASHBOARD
      </ul>

      <ul className="HostList">
        {Host.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
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
    </div>
  )
}

export default Sidebar;
