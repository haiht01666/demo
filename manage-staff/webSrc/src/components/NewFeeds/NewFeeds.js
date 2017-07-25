import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
require('../../static/web/libs/jquery.simplyscroll.min');
import '../../static/web/styles/jquery.simplyscroll.css';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/articlesActions';


class NewFeeds extends React.Component {
  componentDidMount() {
    $('#scroller').simplyScroll({orientation: 'vertical'});
  }

  handleTintuc1(e, url, id) {
    e.preventDefault();
    browserHistory.push(url);
    this.props.actions.loadArticleDetail(id);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-12">
        <div className="news-top">
          <div className="">
            <div className="">
              <div className="">
                <div className="global-title"><h2>{this.props.message.beautyConsultant}</h2>
                  <div className="clearfix"/>
                </div>
                <div className="clearfix"/>
                <div className="content-news">
                  <div className="simply-scroll simply-scroll-container">
                    <div className="simply-scroll-clip">
                      <div className="simply-scroll-list" style={{height: '2088px'}} id="scrollerDiv">
                        <ul id="scroller" className="simply-scroll-list" style={{height: '1044px'}}>
                          {
                            this.props.news.map((item, index) => {
                              //let subtitle = item.subTitle.substring(0, item.subTitle.indexOf('.', 100) > 0 ? item.subTitle.indexOf('.', 100) : item.subTitle.length);
                              return (
                                <li key={index}>
                                  <div className="col-xs-12 col-md-12 item-news">
                                    <div className="row">
                                      <div className="col-xs-3">
                                        <div className="row">
                                          <div className="image" id="newFeed-img">
                                            <Link to={`/tintuc/${item.id}`} title={item.title} onClick={(e) => {this.handleTintuc1(e, `/tintuc/${item.id}`, item.id)}}><img
                                              src={'' + item.imageUrl}
                                              className="img-responsive"
                                              alt={item.title}/></Link></div>
                                        </div>
                                      </div>
                                      <div className="col-xs-9">
                                        <div className="row-8">
                                          <div className="name-news"><Link
                                            to={`/tintuc/${item.id}`}
                                            title={item.title} onClick={(e) => {this.handleTintuc1(e, `/tintuc/${item.id}`, item.id)}}>{item.title}</Link></div>
                                          <div className="desc-news">
                                            {item.subTitle}...
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    news: state.news.topNews,
    message: state.common.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(NewFeeds);
