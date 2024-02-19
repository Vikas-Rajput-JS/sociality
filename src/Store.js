import { createStore } from "redux";
import RootReducer from "./Redux/Main/Main";


const Store = createStore(RootReducer)
export default Store;