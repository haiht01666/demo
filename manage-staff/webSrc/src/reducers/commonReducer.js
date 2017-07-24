import initialState from "./initialState";
import {CHANGE_PATH_NAME, CHANGE_LANGUAGE, LOAD_COMPANY_INFO, SET_BANNER_LIST, SET_BANNER_COUNT} from '../constants/actionTypes';
import objectAssign from 'object-assign';
export default function commonReducer(state = initialState.common, action) {
  switch (action.type) {
    case CHANGE_PATH_NAME:
      return objectAssign({}, state, {pathname: action.pathname});
    case CHANGE_LANGUAGE:
      return objectAssign({}, state, {language: action.language, message : action.language == 'vi' ? initialState.viMessage : initialState.enMessage});
    case LOAD_COMPANY_INFO:
      return objectAssign({}, state, {introduce: action.introduce, contact: action.contact});
    case SET_BANNER_LIST:
      return objectAssign({}, state, {banner: action.banner});
    case SET_BANNER_COUNT:
      return objectAssign({}, state, {count: action.count});
    default:
      return state;
  }
}
