import React, { useState } from "react";
import "./Chat.css";

import axios from "../axios";

//material ui
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Demo app",
      timestamp: "Just now",
      received: false,
    });

    setInput("")
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar></Avatar>

        <div className="chat_headerInfo">
          <h3>Room name</h3>
          <p>Last Seen at ...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((m) => {
          return (
            <p className={`chat_message ${m.received && "chat_reciever"}`}>
              <span className="chat_name">{m.name}</span>
              {m.message}
              <span className="chat_timestamp">{m.timestamp}</span>
            </p>
          );
        })}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon></InsertEmoticonIcon>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          ></input>
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon></MicIcon>
      </div>
    </div>
  );
}

export default Chat;
