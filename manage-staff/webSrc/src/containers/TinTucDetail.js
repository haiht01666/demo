import React from 'react';
import Header from '../components/Header/Header';
import NewsDetail from '../components/NewsDetail/NewsDetail';
import Footer from '../components/Footer/Footer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/articlesActions';

class TinTucDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount(){
    this.props.actions.loadArticleDetail(this.props.id);
  }
  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <NewsDetail/>
        </div>
        <Footer/>
      </div>
    );
  }
}

TinTucDetail.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    news: state.news.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TinTucDetail);
