import { connect } from "react-redux";

import socketIOClient from "socket.io-client";
import SocketContext from "./socket-context";
import serverConfig from '../.env.json';

const SocketProvider = (props) => {
  const { messages } = props;

  const { store } = props;
  const socket = socketIOClient(serverConfig.socketServerHost);



  const publishMessageHandler = (message) => {
    console.log('PUBLISHED');
    socket.emit("chat message", message);
  };

  const socketContext = {
    publishMessage: publishMessageHandler,
  };

  return (
    <SocketContext.Provider value={socketContext}>
      {props.children}
    </SocketContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps, null)(SocketProvider);
