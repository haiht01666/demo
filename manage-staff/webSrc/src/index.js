/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';

import configureStore from './store/configureStore';
import {loadTopProducts} from './actions/productsActions';
import {changeLaguage, loadCompanyInfoData, loadBannerList} from './actions/commonActions';
import {loadTopArticles} from './actions/articlesActions';
import {loadCategories} from './actions/categoryActions';

// require('./favicon.ico'); // Tell webpack to load favicon.ico
 // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';
// import 'tether';
// import 'jquery';
// import 'bootstrap';
// require('!!script!jquery/dist/jquery.min.js');
// require('tether');
require('bootstrap');
require('bootstrap/dist/css/bootstrap.min.css');
import './static/web/styles/styles.scss';

const store = configureStore();
store.dispatch(loadBannerList());
store.dispatch(changeLaguage('vi'));
store.dispatch(loadCompanyInfoData());
store.dispatch(loadTopProducts());
//store.dispatch(loadProducts(10,0));
store.dispatch(loadTopArticles());
store.dispatch(loadCategories());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('wrapper')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
