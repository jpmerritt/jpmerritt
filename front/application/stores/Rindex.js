import { combineReducers } from "redux";
import { routerReducer }   from "react-router-redux";



const reducers = combineReducers( Object.assign( {}, { routing: routerReducer } ) );
export default reducers;