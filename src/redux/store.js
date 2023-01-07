import { createStore } from "redux";
import msgReducer from "./reducer";

const store = createStore(msgReducer);

export default store