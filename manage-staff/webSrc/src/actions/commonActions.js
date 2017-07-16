import * as types from "../constants/actionTypes";

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
