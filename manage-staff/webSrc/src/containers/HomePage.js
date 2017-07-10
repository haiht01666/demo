import React from 'react';
import Header from '../components/Header/Header';
import Banner from '../components/Banner/Banner';
import NewFeeds from '../components/NewFeeds/NewFeeds';
import CustomerComment from '../components/CustomerComment/CustomerComment';
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

    $("#bxslider1").bxSlider({
      pager: !1,
      controls: !0,
      moveSlides: 1,
      hideControlOnEnd: !0,
      infiniteLoop: !0,
      auto: !0,
      pause: 7e3,
      speed: 2e3
    });
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
              <CustomerComment/>
            </div>
            <Products productList={this.props.products}
                      productTitle="SẢM PHẦM CHỦ ĐẠO"
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
