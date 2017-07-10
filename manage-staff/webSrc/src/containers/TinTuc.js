import React from 'react';
import Header from '../components/Header/Header';
import News from '../components/News/News';
import Footer from '../components/Footer/Footer';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/articlesActions';
import {connect} from 'react-redux';


class TinTuc extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <News/>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TinTuc);
