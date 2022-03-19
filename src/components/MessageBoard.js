import React, { useState } from "react";
import { connect } from "react-redux";
import CreateReaction from "./CreateReaction";
import Modal from "react-bootstrap/Modal";
//import { relative } from 'path';

const MyVerticallyCenteredModal = (props) => {
  const { messageReactions } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Message Reactions
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {messageReactions.map((reaction, index) => {
          const { id, username, emoji } = reaction;
          return (
            <span key={id}>
              <em>{username}: </em> {emoji}
            </span>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

const MessageReactions = ({ messageReactions }) => {
  const [reactionList, setList] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  if (!messageReactions) return null;
  console.log(reactionList);

  return (
    <div>
      <span
        onClick={() => setModalShow(true)}
        className="reactions-by-btn"
        style={{ fontSize: "14px" }}
      >
        {messageReactions[messageReactions.length - 1].emoji}
        {messageReactions.length}
      </span>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        messageReactions={messageReactions}
      />
    </div>
  );
};

const MessageBoard = ({ messages, reactions }) => {
  // = ({ messages, reactions }) =>

  return (
    <div className="w-100">
      {messages.items.map((messageItem, index) => {
        const { id, text, timestamp, username } = messageItem;

        return (
          <div
            style={{ borderBottom: "1px solid #d1d8e0" }}
            className="d-flex flex-column"
            key={id}
          >
            <div className="d-flex w-100 justify-content-start px-2 py-1">
              <div className="mt-2">
                <div className="profile-img text-center">
                  {username && username.charAt(0)}
                </div>
              </div>
              <div className="mt-2 mr-auto px-2 text-left">
                <p className="my-auto user-text">{username}</p>
                <p className="chat-text my-auto text-left">{text}</p>
                <small className="chat-date">
                  {new Date(timestamp).toDateString()}
                </small>
              </div>
              <div className="">
                <CreateReaction messageId={id} />
                <MessageReactions messageReactions={reactions[id]} />
              </div>
            </div>
            <div className="d-flex w-100 justify-content-start">
              <div className="mr-auto"></div>
              <div className="d-flex justify-content-start"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages,
  reactions: state.reactions,
});

export default connect(mapStateToProps, null)(MessageBoard);
