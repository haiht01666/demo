import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/productsActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
    if(e.key == 'Enter'){
      this.searchProduct();
    }
  }

  handleClickProducts(e, category_key) {
    e.preventDefault();
    if (category_key != null) {
      this.props.actions.loadProductsWithCategory(10, 0, category_key);
      browserHistory.push(`/sanpham/${category_key}`);
    } else {
      this.props.actions.loadProducts(10, 0);
      browserHistory.push(`/sanpham`);
    }
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({
      searchInput: e.target.value
    });
  }

  searchProduct() {
    if (this.state.searchInput != '') {
      this.props.actions.searchProduct(10,0,this.state.searchInput);
      browserHistory.push(`/timkiemsanpham/${this.state.searchInput}`);
    }
  }

  render() {
    return (
      <header id="header">
        <div className="topbar">
          <div className="container">
            <div className="pull-left left">
            </div>
            <div className="right">
              <div className="block login">
                <a className="btnlogin user_name_display" href="#" title="">Đăng nhập</a>
              </div>
              <div className="block contact">
                <a className="" href="#" title=""><img
                  src="https://tpb.vn/sites/all/modules/languageicons/flags/vi.png"/><i
                  className="fa fa-angle-down"/></a>
                <div className="expandcontact ">
                  <div className="col-xs-6"/>
                  <div className="col-md-12 col-sm-12 col-xs-6 expandContactDetail">
                    <label>Tiếng Việt</label>
                    <img src="https://tpb.vn/sites/all/modules/languageicons/flags/vi.png"/>
                  </div>
                  <div className="col-xs-6"/>
                  <div className="col-md-12 col-sm-12 col-xs-6 expandContactDetail">
                    <label>English</label>
                    <img src="https://tpb.vn/sites/all/modules/languageicons/flags/en.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-5 col-sm-5 col-md-12 col-lg-12"/>
            <div className="col-xs-3 col-lg-2 col-md-3">
              <Link to="/home"><img width="100%" src="../../images/logo2.png" alt=""/></Link>
            </div>
            <div className="col-xs-12 col-lg-10 col-md-9">
              <div className="navbar">
                <div className="">
                  <div className="">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 menuTitle"
                         style={{borderTop: '1px solid #00cda0', borderBottom: '1px solid #00cda0'}}>
                      <div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                        <div className="navbar-header">
                          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                  data-target="#nav"
                                  aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                          </button>
                        </div>
                        <nav className="collapse navbar-collapse" id="nav">
                          <ul className="nav navbar-nav" data-smartmenus-id="14959438921544436">
                            <li className="">
                              <Link to="/home" title="TRANG CHỦ">
                                TRANG CHỦ
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/about" title="GIỚI THIỆU">
                                GIỚI THIỆU
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/sanpham" title="SẢN PHẨM" onClick={(e) => {
                                this.handleClickProducts(e, null)
                              }}
                                    className="item-haschild has-submenu" id="sm-14959438921544436-17"
                                    aria-haspopup="true"
                                    aria-controls="sm-14959438921544436-18" aria-expanded="false">
                                SẢN PHẨM<span className="caret"/>
                              </Link>
                              <ul className="dropdown-menu" id="sm-14959438921544436-18" role="group" aria-hidden="true"
                                  aria-labelledby="sm-14959438921544436-17" aria-expanded="false">
                                {
                                  this.props.categories.map((item, index) => {
                                    return (
                                      <li className="header-categories" key={index}>
                                        <Link to={`/sanpham/${item.category_key}`} title={item.name} onClick={(e) => {
                                          this.handleClickProducts(e, item.category_key)
                                        }}>
                                          {item.name}
                                        </Link>
                                      </li>
                                    );
                                  })
                                }
                              </ul>
                            </li>
                            <li className="">
                              <Link to="/tintuc" title="TIN TỨC">
                                TIN TỨC
                              </Link>
                            </li>
                            <li className="">
                              <Link to="/lienhe" title="LIÊN HỆ">
                                LIÊN HỆ
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 search-input">
                        <input type="text" className="form-control" placeholder="Tìm Kiếm" value={this.state.searchInput}
                               onChange={this.handleSearch} onKeyPress={this.handleKeyPress}/>
                        <i className="fa fa-search" aria-hidden="true" onClick={this.searchProduct}></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.array.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
