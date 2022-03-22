import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import PubSubContext from "../pubsub/pubsub-context";
import { newMessage } from "../redux/actions/messages";

import socketIOClient from "socket.io-client";
import SocketContext from "../socket/socket-context";

import serverConfig from '../.env.json';

const PublishMessage = (props) => {
  const pubSubCtx = useContext(PubSubContext);
  const socketCtx = useContext(SocketContext);
  const [socket, setSocket] = useState(null);

  const { newMessage } = props;

  const [text, setText] = useState("");
  const { username } = props;

  useEffect(() => {
    const newSocket = socketIOClient(serverConfig.socketServerHost);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const updateText = (event) => {
    setText(event.target.value);
  };

  const publishMessage = () => {
    //newMessage({ text, username });
    //pubSubCtx.publishMessage({ text, username });
    //publishMessageHandler(newMessage({ text, username }));
    socket.emit("chat message", newMessage({ text, username }));

    //pubSubCtx.publishMessage(newMessage({ text, username }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      publishMessage();
      setText("");
    }
  };

  return (
    <div className="d-flex justify-content-start">
      <div>
        <button className="btn btn-send" onClick={publishMessage}>
          <i className="fas fa-paper-plane text-white"></i>
        </button>
      </div>
      <div className="w-100">
        <input
          className="form-control input-custom"
          type="text"
          placeholder="what's on your mind?"
          onChange={updateText}
          value={text}
          onKeyDownCapture={handleKeyPress}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps, { newMessage })(PublishMessage);
