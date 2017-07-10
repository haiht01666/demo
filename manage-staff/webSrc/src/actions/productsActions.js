import * as types from '../constants/actionTypes';
import {} from '../constants/actionTypes';
import axios from 'axios';
import {browserHistory} from 'react-router'

export function loadProductsSuccess(data, numberPage) {
  return {
    type: types.LOAD_PRODUCTS_SUCCESS,
    data,
    numberPage
  };
}

export function loadProductsSearchSuccess(data, numberPage) {
  return {
    type: types.LOAD_PRODUCTS_SEARCH_SUCCESS,
    data,
    numberPage
  };
}

export function loadProductsDetailSuccess(productDetail) {
  return {
    type: types.LOAD_PRODUCT_DETAIL_SUCCESS,
    productDetail
  };
}

export function loadTopProductsSuccess(topProducts) {
  return {
    type: types.LOAD_TOP_PRODUCTS_SUCCESS,
    topProducts,
  };
}

export function clearProductsDetails() {
  return {
    type: types.CLEAR_PRODUCTS_DETAIL
  };
}

export function clearProducts() {
  return {
    type: types.CLEAR_PRODUCTS
  };
}

export function clearProductsSearch() {
  return {
    type: types.CLEAR_PRODUCTS_SEARCH
  };
}

export function setCurrentPage(currentPage) {
  return {
    type: types.SET_CURRENT_PAGE,
    currentPage
  };
}
export function setCurrentSearchPage(currentSearchPage) {
  return {
    type: types.SET_CURRENT_SEARCH_PAGE,
    currentSearchPage
  };
}

export function searchProduct(limit, offset, searchStr) {
  return function (dispatch) {
    dispatch(clearProductsSearch());
    return axios.get('http://localhost:8080/api/searchProduct?limit=' + limit + '&offset=' + offset+ '&searchStr=' + searchStr)
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadProductsSearchSuccess(response.data.resultData, response.data.numberRecord));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}


export function loadProducts(limit, offset) {
  return function (dispatch) {
    dispatch(clearProducts());
    return axios.get('http://localhost:8080/api/getProductPage?limit=' + limit + '&offset=' + offset)
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadProductsSuccess(response.data.resultData, response.data.numberRecord));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}

export function loadProductsWithCategory(limit, offset, category) {
  return function (dispatch) {
    dispatch(clearProducts());
    return axios.get('http://localhost:8080/api/getProductsByCategory?limit=' + limit + '&offset=' + offset+ '&category=' + category)
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadProductsSuccess(response.data.resultData, response.data.numberRecord));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}

export function loadTopProducts() {
  return function (dispatch) {
    return axios.get('http://localhost:8080/api/getProductPage?limit=10&offset=0')
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadTopProductsSuccess(response.data.resultData));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}

export function loadProductDetail(id) {
  return function (dispatch) {
    dispatch(clearProductsDetails());
    return axios.get('http://localhost:8080/api/getProductById?id=' + id)
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadProductsDetailSuccess(response.data.resultData));
        }else{
          browserHistory.push('/products');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}
