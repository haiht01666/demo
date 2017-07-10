import React from 'react';
import Header from '../components/Header/Header';
import Products from '../components/Products/Products';
import Footer from '../components/Footer/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/productsActions';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import Pagination from 'rc-pagination';

class ProductsSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(page) {
    window.scrollTo(0, 0);
    this.props.actions.searchProduct(10, (page - 1) * 10, this.props.searchStr);
    this.props.actions.setCurrentSearchPage(page);
  }

  componentDidMount() {
    $('.titleSpecial').hide();
  }
  componentWillMount(){
    this.props.actions.searchProduct(10, 0, this.props.searchStr);
  }

  handleClickProducts(e) {
    e.preventDefault();
    this.props.actions.loadProducts(10, 0);
    browserHistory.push(`/sanpham`);
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <div className="container">
            <div className="row">
              <div className="title-global">
                <h2 className="productDetailSpecial"><Link to={`/sanpham`} onClick={(e) => {
                  this.handleClickProducts(e)
                }}>Sản Phẩm</Link></h2>
                <h2 className="productDetailSearch">Từ khóa tìm kiếm</h2>
                <h2 className="productDetailSearch productDetailSearch1">{'"'+ this.props.searchStr + '"'}</h2>
                <div className="clearfix"/>
              </div>
              <Products
                productTitle=""
                productList={this.props.products}/>
              <div style={{float: 'right', paddingBottom: '20px'}}>
                <Pagination onChange={this.onChange} current={this.props.currentPage} total={this.props.numberPage}
                            pageSize={10}/>
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
    searchStr: ownProps.routeParams.searchStr,
    products: state.products.searchProducts.data,
    numberPage: state.products.searchProducts.numberPage,
    currentPage: state.products.searchProducts.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsSearchPage);
