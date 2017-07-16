import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as actions from '../../actions/productsActions';
import {bindActionCreators} from 'redux';
class ProductDetail extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    //let id = this.props.params[id];
    //console.log(1);
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
    return (
      <div className="container">
        <div className="product-info">
          <div className="title-global">
            <h2 className="productDetailSpecial"><Link to={`/sanpham`} onClick={(e)=>{this.handleClickProducts(e, null)}}>Sản Phẩm</Link>{' > '}<Link to={`/sanpham/${this.props.productDetail.categoryKey}`} onClick={(e)=>{this.handleClickProducts(e, this.props.productDetail.categoryKey)}}>{this.props.productDetail.categoryName}</Link>{' > ' + this.props.productDetail.name}</h2>
            <div className="clearfix"/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 col-md-12">
            <div className="product-detail">
              <div className="top-detail">
                <div className="photo">
                  <div className="preview"><
                    img itemProp="image"
                        src={'http://localhost:8080'+this.props.productDetail.imageUrl}
                        alt={this.props.productDetail.name} title={this.props.productDetail.name}/>
                  </div>
                </div>

              </div>

              <div className="product-info">
                <div className="title-global">
                  <h2>{this.props.message.highlightsFeatures}</h2>
                  <div className="clearfix"/>
                </div>
                <div className="editor">
                  <div dangerouslySetInnerHTML={{ __html: this.props.productDetail.characteristic }} />
                </div>
              </div>
              <div className="product-info">
                <div className="title-global">
                  <h2>{this.props.message.productInfo}</h2>
                  <div className="clearfix"/>
                </div>
                <div className="editor">
                  <div dangerouslySetInnerHTML={{ __html: this.props.productDetail.detail }} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.common.message,
    productDetail: state.productDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
