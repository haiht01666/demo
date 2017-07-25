import * as types from "../constants/actionTypes";
import axios from 'axios';
import {browserHistory} from 'react-router'

export function changePathName(pathname) {
  return {
    type: types.CHANGE_PATH_NAME,
    pathname
  };
}

export function changeLaguage(language) {
  return {
    type: types.CHANGE_LANGUAGE,
    language
  };
}
export function loadCompanyInfo(introduce, contact) {
  return {
    type: types.LOAD_COMPANY_INFO,
    introduce,
    contact
  };
}

export function loadCompanyInfoData() {
  return function (dispatch) {
    return axios.get('/api/getInfoCompany')
      .then(function (response) {
        if(response.data.result) {
          dispatch(loadCompanyInfo(response.data.resultData.introduce, response.data.resultData.contact));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}

export function setBannerList(banner) {
  return {
    type: types.SET_BANNER_LIST,
    banner
  };
}
export function setBannerCount(count) {
  return {
    type: types.SET_BANNER_COUNT,
    count
  };
}

export function loadBannerList() {
  return function (dispatch) {
    return axios.get('/api/getBannerList')
      .then(function (response) {
        if(response.data.result) {
          dispatch(setBannerList(response.data.resultData));
        }else {
          browserHistory.push('/');
        }
      }).catch(function (error) {
        browserHistory.push('/');
        console.log(error);
      });
  };
}
