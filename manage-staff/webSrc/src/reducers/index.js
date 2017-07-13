import {combineReducers} from 'redux';
import products from './productsReducer';
import productDetail from './productDetailReducer';
import newsDetail from './newsDetailReducer';
import news from './newsReducer';
import categories from './categoriesReducer';
import info from './infoReducer';
import banner from './bannerReducer';
import customer from './customerReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  products,
  productDetail,
  newsDetail,
  news,
  categories,
  info,
  banner,
  customer,
  routing: routerReducer
});

export default rootReducer;
