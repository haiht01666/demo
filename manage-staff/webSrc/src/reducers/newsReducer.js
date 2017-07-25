import {LOAD_ARTICLES_SUCCESS, LOAD_TOP_ARTICLES_SUCCESS, CLEAR_ARTICLES} from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
export default function newsReducer(state = initialState.news, action) {
  switch (action.type) {
    case LOAD_ARTICLES_SUCCESS:
      return objectAssign({}, state, {data : action.news, numberPage : action.numberPage});
    case CLEAR_ARTICLES:
      return objectAssign({}, state, {data : [], numberPage : 1});
    case LOAD_TOP_ARTICLES_SUCCESS:
      return objectAssign({}, state, {topNews : action.topNews});
    default:
      return state;
  }
}
