import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {connect} from 'react-redux';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-12 global-title">
                <h2 className="">{this.props.message.contact}</h2>
                <div className="clearfix"/>
              </div>
          </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.common.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
