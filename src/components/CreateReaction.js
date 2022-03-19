import React, { useState } from "react";
import { connect } from "react-redux";
import { REACTION_OBJECTS } from "../redux/actions/types";
import { createReaction } from "../redux/actions/reactions";

const CreateReaction = () => {
  const [emojiShow, setEmojiShow] = useState(false);

  const publishReaction = ({ type, emoji }) => {
    setEmojiShow(!emojiShow);
  };

  //   publishReaction =
  //     ({ type, emoji }) =>
  //     () => {
  //       const { username, messageId } = this.props;
  //       //this.context.pubsub.publish(createReaction({ type, emoji, username, messageId }));
  //       this.toggleEmoji();
  //     };

  const toggleEmoji = () => {
    setEmojiShow(!emojiShow);
  };

  return (
    <div className="emojis-reaction text-right">
      <span onClick={toggleEmoji}>&#x263A;</span>
      <div className="emojis-container">
        <div className={"emojis " + (emojiShow ? "visible" : "hidden")}>
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

export default CreateReaction;
