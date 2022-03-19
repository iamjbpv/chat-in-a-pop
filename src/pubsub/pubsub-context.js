import React from "react";

const PubSubContext = React.createContext({
  publishMessage: (message) => {},
});

export default PubSubContext;
