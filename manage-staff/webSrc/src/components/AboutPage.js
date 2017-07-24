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
                <h2 className="">{this.props.message.contactCompany}</h2>
                <div className="clearfix"/>
              </div>
              {/*<p>Thông tin liên hệ</p>*/}
              {/*<p><strong>Công ty DFG</strong></p>*/}
              {/*<p>Địa chỉ:</p>*/}
              {/*<p>Điện Thoại</p>*/}
              {/*<p>Email:</p>*/}
              {/*<p>Website:</p>*/}
            </div>
            <div dangerouslySetInnerHTML={{__html: this.props.introduce}}/>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.common.message,
    introduce: state.common.introduce
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onComponentWillMount() {
    //   dispatch(cartAction.toggleEditorView(false));
    // },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
