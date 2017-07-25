import React from 'react';
import Header from '../components/Header/Header';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Products from '../components/Products/Products';
// import NewFeeds from '../components/NewFeeds/NewFeeds';
// import CustomerComment from '../components/CustomerComment/CustomerComment';
import Footer from '../components/Footer/Footer';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/productsActions';

class ProductDetailPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentWillMount(){
    this.props.actions.loadProductDetail(this.props.id);
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <ProductDetail/>
          <Products productTitle="SẢN PHẦM TƯƠNG TỰ"
                    productList = {this.props.products.filter((item)=>{return item.id != this.props.id})}
          />
        </div>
        <Footer/>
      </div>
    );
  }
}

ProductDetailPage.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.params.id,
    products: state.products.topProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);
