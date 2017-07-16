import initialState from "./initialState";
import {CHANGE_PATH_NAME, CHANGE_LANGUAGE} from '../constants/actionTypes';
import objectAssign from 'object-assign';
export default function commonReducer(state = initialState.common, action) {
  switch (action.type) {
    case CHANGE_PATH_NAME:
      return objectAssign({}, state, {pathname: action.pathname});
    case CHANGE_LANGUAGE:
      return objectAssign({}, state, {language: action.language, message : action.language == 'vi' ? initialState.viMessage : initialState.enMessage});
    default:
      return state;
  }
}
