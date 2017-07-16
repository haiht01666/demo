import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';
class NewsDetail extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="con-xs-12 col-md-12">
            <div className="news-content">
              <div className="">
                <div className="header">
                  <h2>{this.props.newsDetail.title}</h2>
                  <div className="date">{this.props.newsDetail.cdate}</div>
                </div>
                <div className="description">
                  {this.props.newsDetail.subTitle}
                </div>
                <div className="content contentNewsDetails">

                  <div className="text-center">
                    <figure className="caption"><img alt="" height="435"
                                                     src={'http://localhost:8080'+this.props.newsDetail.imageUrl}
                                                     width="auto"/>
                      <figcaption className="figcaption" style={{fontStyle: 'italic', paddingTop: '10px', paddingBottom: '10px'}}>{this.props.newsDetail.title}</figcaption>
                    </figure>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: this.props.newsDetail.content }} />
                  <br/>
                  <div className="description" style={{textAlign: 'right'}}>
                    {this.props.newsDetail.author}
                  </div>
                  <div className="clearfix">
                  </div>

                  <div className="other-news">
                    <h3>{this.props.message.otherNews}</h3>
                    <ul>
                      {this.props.topNews.filter((item)=>{return item.id != this.props.id}).map((item, index)=>{
                        return(
                          <li key={index}>»&nbsp;<Link to={"/tintuc/" + item.id} title={item.title}>{item.title}</Link> <span className="date">({moment(item.cdate, 'YYYY-MM-DD').format('DD-MM-YYYY')})</span></li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="clearfix"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: state.newsDetail.id,
    newsDetail: state.newsDetail,
    news : state.news.data,
    topNews: state.news.topNews,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
