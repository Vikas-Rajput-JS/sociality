import {UserReducer} from '../Reducer/Reducer'
import { createStore } from 'redux'

const RootReducer = createStore(UserReducer)


export default RootReducer;