import {LOAD_CATEGORIES_SUCCESS} from '../constants/actionTypes';
import initialState from './initialState';
export default function categoriesReducer(state = initialState.categories, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    default:
      return state;
  }
}
