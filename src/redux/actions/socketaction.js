export const socketAction = (message) => async (dispatch) => {
  try {
    dispatch(message);
  } catch (rt) {}
};
