import React from 'react';
import Header from '../components/Header/Header';
import Products from '../components/Products/Products';
// import NewFeeds from '../components/NewFeeds/NewFeeds';
// import CustomerComment from '../components/CustomerComment/CustomerComment';
import Footer from '../components/Footer/Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/productsActions';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import Pagination from 'rc-pagination';

class ProductsPage extends React.Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(page){
    window.scrollTo(0,0);
    if(this.props.category != null) {
      this.props.actions.loadProductsWithCategory(10,(page - 1)*10,this.props.category);
    }else{
      this.props.actions.loadProducts(10,(page - 1)*10);
    }
    this.props.actions.setCurrentPage(page);
  }
  componentDidMount(){
    $('.titleSpecial').hide();
  }
  handleClickProducts(e, category_key){
    e.preventDefault();
    if(category_key != null) {
      this.props.actions.loadProductsWithCategory(10,0,category_key);
      browserHistory.push(`/sanpham/${category_key}`);
    }else{
      this.props.actions.loadProducts(10,0);
      browserHistory.push(`/sanpham`);
    }
  }
  render() {
    let categoryName = '';
    if(this.props.category != null){
      this.props.categories.forEach((item)=>{
        if(item.category_key == this.props.category){
          categoryName = item.name;
        }
      });
    }
    return (
      <div>
        <Header/>
        <div id="main">
          <div className="container">
            <div className="row">
                <div className="title-global">
                  <h2 className="productDetailSpecial"><Link to={`/sanpham`} onClick={(e)=>{this.handleClickProducts(e, null)}}>Sản Phẩm</Link>{this.props.category != null ? ' > ' + categoryName : ''}</h2>
                  <div className="clearfix"/>
                </div>
              <Products
                productTitle=""
                productList={this.props.products}/>
              <div style={{float: 'right', paddingBottom: '20px'}}>
                <Pagination onChange={this.onChange} current={this.props.currentPage} total={this.props.numberPage} pageSize={10} />
              </div>
            </div>
          </div>
          {/*<div className="container">*/}
            {/*<div className="row">*/}
              {/*<CustomerComment/>*/}
              {/*<NewFeeds/>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
        <Footer/>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    category: ownProps.routeParams.category,
    products: state.products.data,
    categories : state.categories,
    numberPage : state.products.numberPage,
    currentPage : state.products.currentPage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
