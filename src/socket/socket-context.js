import React from "react";

const SocketContext = React.createContext({
  publishMessage: (message) => {},
});

export default SocketContext;
