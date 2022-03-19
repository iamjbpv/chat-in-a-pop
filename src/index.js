import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import App from "./App";
import PubNub from "pubnub";
import pubnubConfig from "./pubsub/pubnub.config";
//import { newMessage } from "./redux/actions/messages";

import reportWebVitals from "./reportWebVitals";
import PubSubProvider from "./pubsub/pubSubProvider";
import PubSub from "./pubsub/pubsub";
import SocketProvider from "./socket/SocketProvider";
import socketIOClient from "socket.io-client";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

console.log("store.getstate()", store.getState());
store.subscribe(() => console.log("store.getstate()", store.getState()));


// const pubsub = new PubSub();

// pubsub.addListener({
//   message: (messageObject) => {
//     const { message, channel } = messageObject;

//     console.log("received message", message, "channel", channel);
//     store.dispatch(message);
//   },
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PubSubProvider store={store}> */}
      <SocketProvider store={store}>
        <App />
      </SocketProvider>
      {/* </PubSubProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
