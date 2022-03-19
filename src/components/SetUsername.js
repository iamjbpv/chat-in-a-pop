import React from "react";
import { connect } from "react-redux";
import { setUsername } from "../redux/actions/username";

const SetUsername = (props) => {
  const { setUsername } = props; //from redux actions

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      setUsername(event.target.value);
    }
  };

  return (
    <div className="username-wrapper">
      <h5>What's Your Name?</h5>
      <input
        className="input-username text-center"
        onKeyDownCapture={onKeyDownHandler}
      />
    </div>
  );
};

export default connect(null, { setUsername })(SetUsername);
