import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
require('../../static/web/libs/jquery.bxslider.min');
// require('../../static/web/styles/jquery.bxslider.css');


class CustomerComment extends React.Component {
  componentDidMount() {
    $('#bxslider1').bxSlider({
      pager: !1,
      controls: !0,
      moveSlides: 1,
      hideControlOnEnd: !0,
      infiniteLoop: !0,
      auto: !0,
      pause: 7e3,
      speed: 2e3,
      options: 'fade'
    });
  }

  render() {
    return (
      <div className="col-xs-12 col-md-7">
        <div className="">
          <div className="news-top">
            <div className="">
              <div className="">
                <div className="">
                  <div className="global-title"><h2>{this.props.message.comment}</h2>
                    <div className="clearfix"/>
                  </div>
                  <div className="clearfix"/>
                  <div className="content-ykien">
                    <div className="bx-wrapper bx-wrapper1">
                      <div className="bx-viewport bx-viewport1" id="bxslider1Div">
                        <ul id="bxslider1" className="bxslider bxslider1">
                          {this.props.customer.map((item, index) => {
                            return (
                              <li className="bx-clone bx-clone1" key={index}>
                                <div className="">
                                  <div className="image-ykien">
                                    <img
                                      src={item.urlImg} className="img-responsive"/>
                                  </div>
                                  <div className="name-yk">{item.nameCustomer}</div>
                                  <div className="desc-yk">
                                    {item.comment}
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

CustomerComment.propTypes = {
  customer: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    customer: state.customer,
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerComment);
