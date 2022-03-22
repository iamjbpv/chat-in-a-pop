import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { REACTION_OBJECTS } from "../redux/actions/types";
import { createReaction } from "../redux/actions/reactions";

import socketIOClient from "socket.io-client";
import SocketContext from "../socket/socket-context";
import serverConfig from "../.env.json";

const CreateReaction = (props) => {
  const [emojiShow, setEmojiShow] = useState(false);
  const [socket, setSocket] = useState(null);
  const { username, messageId, createReaction, meUser } = props;

  const toggleEmoji = () => {
    setEmojiShow(!emojiShow);
  };

  useEffect(() => {
    const newSocket = socketIOClient(serverConfig.socketServerHost);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const publishReaction = ({ type, emoji }) => {
    socket.emit(
      "reaction message",
      createReaction({ type, emoji, username, messageId })
    );
    toggleEmoji();
  };

  return (
    <div className="emojis-reaction text-right">
      <span onClick={toggleEmoji}>&#x263A;</span>
      <div className="emojis-container">
        <div className={"emojis " + (emojiShow ? "visible " : "hidden ") + ( + meUser && "left-0" )}>
          <div className="d-flex justify-content-start">
            {REACTION_OBJECTS.map((REACTION_OBJECT) => {
              const { type, emoji } = REACTION_OBJECT;
              return (
                <div
                  className="emoji-icons"
                  style={{ margin: 5, cursor: "pointer" }}
                  key={type}
                  onClick={() => publishReaction({ type, emoji })}
                >
                  {emoji}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.username,
});

export default connect(mapStateToProps, { createReaction })(CreateReaction);
