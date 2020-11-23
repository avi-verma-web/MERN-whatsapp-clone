import React from "react";
import "./Sidebar.css";

import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";

import SidebarChat from "./SidebarChat";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spongebob-squarepants-1592120738.jpg?crop=0.482xw:1.00xh;0.169xw,0&resize=480:*"></Avatar>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon></DonutLargeIcon>
          </IconButton>
          <IconButton>
            <ChatIcon></ChatIcon>
          </IconButton>
          <IconButton>
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined></SearchOutlined>
          <input placeholder="Search or start new chat" type="text"></input>
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
        <SidebarChat></SidebarChat>
      </div>
    </div>
  );
}

export default Sidebar;
