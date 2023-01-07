const inititalState = { name: "User 1", age: 23 };
const msgReducer = (state = inititalState, action) => {
  switch (action.type) {
    case "UPDATE_MSG": {
      return { ...state, message: action.payload };
    }
  }
  return state;
};
export default msgReducer;