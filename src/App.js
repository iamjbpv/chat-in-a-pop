import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";

import { connect } from "react-redux";
import PublishMessage from "./components/PublishMessage";
import MessageBoard from "./components/MessageBoard";
import SetUsername from "./components/SetUsername";
import socketIOClient from "socket.io-client";
import { socketAction } from "./redux/actions/socketaction";

import serverConfig from './.env.json';

const socket = socketIOClient(serverConfig.socketServerHost);

const App = (props) => {
  const { username, messages, socketAction } = props;
  console.log("before effect", messages);

  useEffect(() => {
    const chatMessageListener = (msg) => {
      const senderIsMe = msg.item.username === username;
      console.log(senderIsMe);
      if (senderIsMe === false) {
        socketAction(msg);
      }
    };

    const reactionMessageListener = (msg) => {
      const senderIsMe = msg.item.username === username;
      console.log(senderIsMe);
      console.log('reaction',msg)
      if (senderIsMe === false) {
        socketAction(msg);
      }
    };

    socket.on("chat message", chatMessageListener);
    socket.on("reaction message", reactionMessageListener);


    return () => {
      socket.off("chat message", chatMessageListener);
      socket.off("reaction message", reactionMessageListener);
    };
  }, [socket, username]);

  const [chatShow, setChatShow] = useState(false);

  const toggleChat = () => {
    setChatShow(!chatShow);
  };

  console.log("username", props);

  const chatContent = (
    <Fragment>
      {username === null ? (
        <div className="text-center my-auto">
          <SetUsername />
        </div>
      ) : (
        <MessageBoard />
      )}
    </Fragment>
  );

  return (
    <div className="chat-main-wrapper">
      <div className={chatShow ? "d-block" : "d-none"}>
        <div className="d-flex flex-column chat-container">
          <div className="top-controls py-1 d-flex justify-content-start">
            <div className="mr-auto px-2">ChatBox</div>
            <div className="px-2 close-chat" onClick={toggleChat}>
              X
            </div>
          </div>
          <div
            id="style-4"
            className="chat-content d-flex justify-content-center h-100 w-100 mb-auto"
          >
            {chatContent}
          </div>
          {username !== null && <PublishMessage />}
        </div>
      </div>
      <button className="chat-button" onClick={toggleChat}>
        <i className="fas fa-comments"></i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
  messages: state.messages,
});

export default connect(mapStateToProps, { socketAction })(App);
