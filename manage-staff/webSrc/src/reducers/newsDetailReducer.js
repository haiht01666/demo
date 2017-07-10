import {CLEAR_ARTICLES_DETAIL, LOAD_ARTICLES_DETAIL_SUCCESS} from '../constants/actionTypes';
//import objectAssign from 'object-assign';
import initialState from './initialState';
export default function newsDetailReducer(state = initialState.newsDetail, action) {
  switch (action.type) {
    case CLEAR_ARTICLES_DETAIL:
      return {};
    case LOAD_ARTICLES_DETAIL_SUCCESS:
      return action.newsDetail;
    default:
      return state;
  }
}
