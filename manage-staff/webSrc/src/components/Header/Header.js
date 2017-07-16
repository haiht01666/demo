import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/productsActions';
import * as commonAction from '../../actions/commonActions';

// require('jq')
// require('tether');
// require('bootstrap');

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchInput: '',
      showLanguage: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.toggleShowLanguage = this.toggleShowLanguage.bind(this);
  }

  handleKeyPress(e) {
    if (e.key == 'Enter') {
      this.searchProduct();
    }
  }

  toggleShowLanguage(e) {
    e.preventDefault();
    this.setState({
      showLanguage: !this.state.showLanguage
    });
  }

  changeLanguage(language) {
    this.props.commonAction.changeLaguage(language);
    this.setState({
      showLanguage: false
    });
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
      this.props.actions.searchProduct(10, 0, this.state.searchInput);
      browserHistory.push(`/timkiemsanpham/${this.state.searchInput}`);
    }
  }

  render() {
    let pathname = this.props.pathname == null ? '' : this.props.pathname;
    let style = this.state.showLanguage ? {
      display: 'block',
      opacity: '1'
    } : {
      display: 'none',
      opacity: '0'
    };

    return (
      <header id="header">
        <div className="topbar">
          <div className="container">
            <div className="pull-left left">
            </div>
            <div className="right">
              <div className="block login">
                <a className="btnlogin user_name_display" href="/login">{this.props.message.login}</a>
              </div>
              <div className="block contact">
                <a className="" onClick={this.toggleShowLanguage} title=""><img
                  src={this.props.language == 'vi' ? "../../static/web/images/vi.png" : "../../static/web/images/en.png"} style={{width: '38px'}}/><i
                  className="fa fa-angle-down"/></a>
                <div className="expandcontact" style={style}>
                  <div className="col-xs-6"/>
                  <div className="col-md-12 col-sm-12 col-xs-6 expandContactDetail" onClick={() => {
                    this.changeLanguage('vi')
                  }}>
                    <label>Tiếng Việt</label>
                    <img src="../../static/web/images/vi.png"/>
                  </div>
                  <div className="col-xs-6"/>
                  <div className="col-md-12 col-sm-12 col-xs-6 expandContactDetail" onClick={() => {
                    this.changeLanguage('en')
                  }}>
                    <label>English</label>
                    <img src="../../static/web/images/en.png"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row head-row">
            {/*<div className="row">*/}
            {/*<div className="col-xs-5 col-sm-5 col-md-12 col-lg-12"/>*/}
            {/*<div className="col-xs-3 col-lg-2 col-md-3">*/}
            {/*<Link to="/home"><img width="100%" src="../../images/logo2.png" alt=""/></Link>*/}
            {/*</div>*/}
            {/*<div className="col-xs-12 col-lg-10 col-md-9">*/}
            {/*<div className="navbar">*/}
            {/*<div className="">*/}
            {/*<div className="">*/}
            {/*<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 menuTitle"*/}
            {/*style={{borderTop: '1px solid #00cda0', borderBottom: '1px solid #00cda0'}}>*/}
            {/*<div className="col-lg-9 col-md-9 col-sm-9 col-xs-9">*/}
            {/*<div className="navbar-header">*/}
            {/*<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"*/}
            {/*data-target="#nav"*/}
            {/*aria-expanded="false">*/}
            {/*<span className="sr-only">Toggle navigation</span>*/}
            {/*<span className="icon-bar"/>*/}
            {/*<span className="icon-bar"/>*/}
            {/*<span className="icon-bar"/>*/}
            {/*</button>*/}
            {/*</div>*/}
            {/*<nav className="collapse navbar-collapse" id="nav">*/}
            {/*<ul className="nav navbar-nav" data-smartmenus-id="14959438921544436">*/}
            {/*<li className="">*/}
            {/*<Link to="/home" title="TRANG CHỦ">*/}
            {/*TRANG CHỦ*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*<li className="">*/}
            {/*<Link to="/about" title="GIỚI THIỆU">*/}
            {/*GIỚI THIỆU*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*<li className="">*/}
            {/*<Link to="/sanpham" title="SẢN PHẨM" onClick={(e) => {*/}
            {/*this.handleClickProducts(e, null)*/}
            {/*}}*/}
            {/*className="item-haschild has-submenu" id="sm-14959438921544436-17"*/}
            {/*aria-haspopup="true"*/}
            {/*aria-controls="sm-14959438921544436-18" aria-expanded="false">*/}
            {/*SẢN PHẨM<span className="caret"/>*/}
            {/*</Link>*/}
            {/*<ul className="dropdown-menu" id="sm-14959438921544436-18" role="group" aria-hidden="true"*/}
            {/*aria-labelledby="sm-14959438921544436-17" aria-expanded="false">*/}
            {/*{*/}
            {/*this.props.categories.map((item, index) => {*/}
            {/*return (*/}
            {/*<li className="header-categories" key={index}>*/}
            {/*<Link to={`/sanpham/${item.category_key}`} title={item.name} onClick={(e) => {*/}
            {/*this.handleClickProducts(e, item.category_key)*/}
            {/*}}>*/}
            {/*{item.name}*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*);*/}
            {/*})*/}
            {/*}*/}
            {/*</ul>*/}
            {/*</li>*/}
            {/*<li className="">*/}
            {/*<Link to="/tintuc" title="TIN TỨC">*/}
            {/*TIN TỨC*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*<li className="">*/}
            {/*<Link to="/lienhe" title="LIÊN HỆ">*/}
            {/*LIÊN HỆ*/}
            {/*</Link>*/}
            {/*</li>*/}
            {/*</ul>*/}
            {/*</nav>*/}
            {/*</div>*/}
            {/*<div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 search-input">*/}
            {/*<input type="text" className="form-control" placeholder="Tìm Kiếm" value={this.state.searchInput}*/}
            {/*onChange={this.handleSearch} onKeyPress={this.handleKeyPress}/>*/}
            {/*<i className="fa fa-search" aria-hidden="true" onClick={this.searchProduct}></i>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded" id="head-nav">
              <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                      data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                      aria-label="Toggle navigation" id="head-navbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link to="/home"><img width="100%" className="head-logo" src='../../static/web/images/logo2.png' alt=""/></Link>
              <div className="collapse navbar-collapse head-content" id="navbarNavDropdown">
                <ul className="navbar-nav head-ul">
                  <li className={pathname == '' || pathname.indexOf('home') != -1 ? "nav-item active" : "nav-item"}>
                    <Link className="nav-link" to="/home">{this.props.message.index}<span
                      className="sr-only">(current)</span></Link>
                  </li>
                  <li className={pathname.indexOf('about') != -1 ? "nav-item active" : "nav-item"}>
                    <Link className="nav-link" to="/about">{this.props.message.intro}</Link>
                  </li>
                  <li className={pathname.indexOf('sanpham') != -1 ? "nav-item dropdown active" : "nav-item dropdown"}>
                    <Link className="nav-link dropdown-toggle" to="/sanpham" id="navbarDropdownMenuLink"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.props.message.product}
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      {
                        this.props.categories.map((item, index) => {
                          return (
                            <Link key={index} className="dropdown-item" to={`/sanpham/${item.category_key}`}
                                  title={item.name} onClick={(e) => {
                              this.handleClickProducts(e, item.category_key)
                            }}>
                              {item.name}
                            </Link>
                          );
                        })
                      }
                    </div>
                  </li>
                  <li className={pathname.indexOf('tintuc') != -1 ? "nav-item active" : "nav-item"}>
                    <Link className="nav-link" to="/tintuc">{this.props.message.news}</Link>
                  </li>
                  <li className={pathname.indexOf('lienhe') != -1 ? "nav-item active" : "nav-item"}>
                    <Link className="nav-link" to="/lienhe">{this.props.message.contact}</Link>
                  </li>
                </ul>
              </div>
            </nav>
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
    pathname: state.common.pathname,
    language: state.common.language,
    message: state.common.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    commonAction: bindActionCreators(commonAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
