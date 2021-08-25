export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "DRIVER") {
    return action.payload;
  }

  return state;
};
