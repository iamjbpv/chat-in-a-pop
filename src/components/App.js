import { useState } from "react";
import { connect } from "react-redux";
import PublishMessage from "./PublishMessage";
import MessageBoard from "./MessageBoard";
import SetUsername from "./SetUsername";
import PubSubContext from "../pubsub/pubsub-context";

const App = () => {
  const pubSubCtx = useContext(PubSubContext);

  const [chatShow, setChatShow] = useState(false);

  const toggleChat = () => {
    setChatShow(!chatShow);
  };

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
            {username === null ? (
              <div className="text-center my-auto">
                <SetUsername />
              </div>
            ) : (
              <MessageBoard />
            )}
          </div>
          {username !== null ? <PublishMessage /> : ""}
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
});

export default connect(mapStateToProps)(App);
