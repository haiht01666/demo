import React from 'react';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import NewFeeds from '../components/NewFeeds/NewFeeds';
import Products from '../components/Products/Products';
import Footer from '../components/Footer/Footer';
import {connect} from 'react-redux';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad() {
    $("#scroller").simplyScroll({orientation: 'vertical'});
    $(".i4ewOd-pzNkMb-haAclf").hide();
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <Banner/>
          <div className="container">
            <div className="row">
              <NewFeeds/>
            </div>
            <Products productList={this.props.products}
                      productTitle={this.props.message.mainProducts}
            />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products.topProducts,
    message: state.common.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onComponentWillMount() {
    //   dispatch(cartAction.toggleEditorView(false));
    // },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
