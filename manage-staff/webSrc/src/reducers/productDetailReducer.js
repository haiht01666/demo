import {CLEAR_PRODUCTS_DETAIL, LOAD_PRODUCT_DETAIL_SUCCESS} from '../constants/actionTypes';
//import objectAssign from 'object-assign';
import initialState from './initialState';
export default function productsReducer(state = initialState.productDetail, action) {
  switch (action.type) {
    case CLEAR_PRODUCTS_DETAIL:
      return {};
    case LOAD_PRODUCT_DETAIL_SUCCESS:
      return action.productDetail;
    default:
      return state;
  }
}
