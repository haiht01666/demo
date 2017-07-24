import {combineReducers} from 'redux';
import products from './productsReducer';
import productDetail from './productDetailReducer';
import newsDetail from './newsDetailReducer';
import news from './newsReducer';
import categories from './categoriesReducer';
import info from './infoReducer';
import customer from './customerReducer';
import common from './commonReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  products,
  productDetail,
  newsDetail,
  news,
  categories,
  info,
  customer,
  common,
  routing: routerReducer
});

export default rootReducer;
