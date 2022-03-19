import { combineReducers } from 'redux';
import messagesReducer from './messages';
import usernameReducer from './username';
import reactionreducer from './reactions';

export default combineReducers({
    messages: messagesReducer,
    username: usernameReducer,
    reactions: reactionreducer,
});