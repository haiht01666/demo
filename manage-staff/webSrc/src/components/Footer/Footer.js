import React from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';

class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <div className="inner clearfix">
          <div className="container">
            <div className="row">
              <div className="bottom">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                  <nav className="nav">
                    <ul>
                      <li>
                        <a href="#" title="">
                          {this.props.message.contactInfo}
                        </a>
                        <p><strong>Công ty TNHH {this.props.info.congty}</strong><br/></p>
                        <p><strong>{this.props.message.address}: </strong>{this.props.info.diachi}</p>
                        <p><strong>{this.props.message.phone}: </strong>{this.props.info.dienthoai}</p>
                        <p><strong>Email: </strong>{this.props.info.email}</p>
                        <p>&nbsp;</p>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-8 col-sm-6 col-xs-6 fanpageDiv">
                  <iframe
                    src="https://www.facebook.com/plugins/like_box.php?app_id=&amp;header=true&amp;height=300&amp;href=https://www.facebook.com/dfgcompanyvn/&amp;locale=vi_VN&amp;sdk=joey&amp;show_border=true&amp;show_faces=true&amp;stream=false&amp;width=380"
                    width="340" height="300"
                    style={{border: 'none', visibility: 'visible', width: '380px', height: '220px',}} scrolling="no"
                    frameBorder="0" allowFullScreen="true" allowTransparency="true"></iframe>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 googleMapDiv">
                  <iframe src="https://www.google.com/maps/d/embed?mid=1z5z4nPaMp_U0VFcKcEL2v6CDZLE"
                          className="googleMap"/>
                  <div className="totalAccess text-right">
                    {/*<p>Tổng số lượt truy cập: </p>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    info: state.info,
    message: state.common.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
