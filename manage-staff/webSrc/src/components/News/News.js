import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Pagination from 'rc-pagination';
import '../../../node_modules/rc-pagination/assets/index.css';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/articlesActions';
class News extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(page){
    window.scrollTo(0,0);
    this.setState({
      page: page
    });
    this.props.actions.loadArticles(10,(page - 1)*10);
  }
  componentWillMount(){
    this.props.actions.loadArticles(10,(this.state.page - 1)*10);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <div className="box_containerlienhe">
              <div className="title-global"><h2>Tin tức</h2>
                <div className="clearfix"/>
              </div>
              <div className="wrap-box-news">
                <div className="">
                  {
                    this.props.news.map((item, index) => {
                      let subtitle = item.subTitle.substring(0, item.subTitle.indexOf('.', 250) > 0 ?  item.subTitle.indexOf('.', 250) : item.subTitle.length);
                      return (
                        <div className="news-item fadeInDown wow news-items-details" data-wow-offset="50"
                             data-wow-duration="3"
                             data-wow-delay="0.2s"
                             key={index}
                        >
                          <div className="header">

                            <div className="clearfix"/>
                          </div>
                          <div className="content">
                            <div className="row-8">
                              <div className="col-xs-3">
                                <Link to={"/tintuc/" + item.id}
                                   title={item.title}>
                                  <img className="img-responsive image-thumb"
                                       src={'http://localhost:8080'+item.imageUrl}
                                       alt={item.title}
                                  /> </Link>
                              </div>
                              <div className="col-xs-9 col-8">
                                <div className="name-news-">
                                  <h3><Link to={"/tintuc/" + item.id}
                                         title={item.title}>{item.title}</Link></h3>
                                  <div className="clearfix"/>
                                </div>
                                <div className="post-detail">
                                  <a>CÔNG TY TNHH DFG </a> - {moment(item.cdate, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                                </div>
                                <div className="text-blog">
                                  {subtitle}...
                                  <div className="clearfix"/>
                                  <Link to={"/tintuc/" + item.id}
                                     title={item.title}><em>Xem thêm</em></Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="clearfix"/>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"/>
          <div style={{width: '100%', paddingBottom: '20px'}}>
            <Pagination style={{float: 'right'}}onChange={this.onChange} current={this.state.page} total={this.props.numberPage} pageSize={10} />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    news: state.news.data,
    numberPage: state.news.numberPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
