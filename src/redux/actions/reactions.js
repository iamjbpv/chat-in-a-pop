import { v4 as uuidv4 } from 'uuid';

export const createReaction = ({ type, emoji, username, messageId }) => {
    return { 
        type, 
        item: { id: uuidv4(), timestamp: Date.now(), emoji, username, messageId } 
    };
}