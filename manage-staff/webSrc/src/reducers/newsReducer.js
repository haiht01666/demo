import {LOAD_ARTICLES_SUCCESS, LOAD_TOP_ARTICLES_SUCCESS} from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
export default function newsReducer(state = initialState.news, action) {
  switch (action.type) {
    case LOAD_ARTICLES_SUCCESS:
      return objectAssign({}, state, {data : action.news, numberPage : action.numberPage});
    case LOAD_TOP_ARTICLES_SUCCESS:
      return objectAssign({}, state, {topNews : action.topNews});
    default:
      return state;
  }
}
