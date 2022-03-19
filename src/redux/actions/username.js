import { SET_USERNAME } from "./types";


//for calling async
export const setUsername = (username) => async (dispatch) => {
  try {
    dispatch({ type: SET_USERNAME, username });
  } catch(rt){

  }
};
