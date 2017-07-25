import * as types from '../constants/actionTypes';
import {} from '../constants/actionTypes';
import axios from 'axios';
import {browserHistory} from 'react-router'

export function loadCategoriesSuccess(categories) {
  return {
    type: types.LOAD_CATEGORIES_SUCCESS,
    categories
  };
}

export function loadCategories() {
  return function (dispatch) {
    return axios.get('/api/getCategories')
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadCategoriesSuccess(response.data.resultData));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}
