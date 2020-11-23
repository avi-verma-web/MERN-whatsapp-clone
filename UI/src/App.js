import React, { useEffect, useState } from "react";
import "./App.css";

import Pusher from "pusher-js";
import axios from "./axios";

import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("51bb99f87b0f71526a77", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");

    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar></Sidebar>
        <Chat messages={messages}></Chat>
      </div>

      {/*side bar*/}
      {/*chat*/}
    </div>
  );
}

export default App;
