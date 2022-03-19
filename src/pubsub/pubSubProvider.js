import PubSub, { MESSAGE_CHANNEL } from "./pubsub";
import { connect } from "react-redux";
import PubSubContext from "./pubsub-context";
import { newMessage } from "../redux/actions/messages";

const PubSubProvider = (props) => {
  const { newMessage } = props;

  const pubsub = new PubSub();

  const publishMessageHandler = (message) => {
    pubsub.publish({ message, channel: MESSAGE_CHANNEL });
  };

  const pubsubContext = {
    publishMessage: publishMessageHandler,
  };

  return (
    <PubSubContext.Provider value={pubsubContext}>
      {props.children}
    </PubSubContext.Provider>
  );
};

export default connect(null, { newMessage })(PubSubProvider);
