import {
  LOAD_PRODUCTS_SUCCESS,
  LOAD_TOP_PRODUCTS_SUCCESS,
  CLEAR_PRODUCTS,
  SET_CURRENT_PAGE,
  LOAD_PRODUCTS_SEARCH_SUCCESS,
  CLEAR_PRODUCTS_SEARCH,
  SET_CURRENT_SEARCH_PAGE
} from '../constants/actionTypes';
import initialState from './initialState';
import objectAssign from 'object-assign';
export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      return objectAssign({}, state, {data: action.data, numberPage: action.numberPage});
    case CLEAR_PRODUCTS_SEARCH:
      return objectAssign({}, state, {searchProducts: {data: [], numberPage: 1, currentPage : 1}});
    case LOAD_PRODUCTS_SEARCH_SUCCESS:
      return objectAssign({}, state, {searchProducts: objectAssign({}, state.searchProducts, {data: action.data,
        numberPage: action.numberPage})});
    case LOAD_TOP_PRODUCTS_SUCCESS:
      return objectAssign({}, state, {topProducts: action.topProducts});
    case CLEAR_PRODUCTS:
      return objectAssign({}, state, {data: [], numberPage: 1, currentPage: 1});
    case SET_CURRENT_PAGE:
      return objectAssign({}, state, {currentPage: action.currentPage});
    case SET_CURRENT_SEARCH_PAGE:
      debugger
      return objectAssign({}, state, {searchProducts: objectAssign({}, state.searchProducts, {currentPage: action.currentSearchPage})});
    default:
      return state;
  }
}
