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
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.2063041861771!2d105.83738382919196!3d20.99964225115819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac7afe6d50af%3A0x74968c3786ae3857!2zbmfDtSAxMDIgVHLGsOG7nW5nIENoaW5oLCBQaMawxqFuZyBNYWksIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1501044008377" width="400" height="300" frameBorder style={{border:'none'}} allowFullscreen className="googleMap"></iframe>
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
