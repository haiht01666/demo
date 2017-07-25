import * as types from '../constants/actionTypes';
import axios from 'axios';
import {browserHistory} from 'react-router'

export function loadArticlesSuccess(news, numberPage) {
  return {
    type: types.LOAD_ARTICLES_SUCCESS,
    news,
    numberPage
  };
}

export function loadTopArticlesSuccess(topNews) {
  return {
    type: types.LOAD_TOP_ARTICLES_SUCCESS,
    topNews,
  };
}
export function clearArticles() {
  return {
    type: types.CLEAR_ARTICLES
  };
}

export function loadArticlesDetailSuccess(newsDetail) {
  return {
    type: types.LOAD_ARTICLES_DETAIL_SUCCESS,
    newsDetail
  };
}

export function clearArticlesDetails() {
  return {
    type: types.CLEAR_ARTICLES_DETAIL
  };
}



export function loadArticles(limit, offset) {
  return function (dispatch) {
    dispatch(clearArticles());
    return axios.get('/api/getArticlePage?limit=' + limit + '&offset=' + offset)
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadArticlesSuccess(response.data.resultData, response.data.numberRecord));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}

export function loadArticleDetail(id) {
  return function (dispatch) {
    dispatch(clearArticlesDetails());
    return axios.get('/api/getArticleById?id=' + id)
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadArticlesDetailSuccess(response.data.resultData));
        }else{
          browserHistory.push('/products');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}


export function loadTopArticles() {
  return function (dispatch) {
    return axios.get('/api/getArticlePage?limit=10&offset=0')
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadTopArticlesSuccess(response.data.resultData));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}
