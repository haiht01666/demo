import React from 'react';
//import {Link} from 'react-router';
import '../../styles/home-page.css';

class CustomerComment extends React.Component {
  render() {
    return (
      <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12 text-center">
        <div className="box box-gray">
          <div className="heading-blog">
            <h3>Ý kiến khách hàng</h3>
          </div>
          <div className="content-blog">
            <div className="right-widget">
              <ul>
                <li className="text-left">
                  <div className="col-xs-12">
                    <div className="customerName col-xs-4"><i className="fa fa-tags"/>&nbsp;Nguyễn Thúy Hằng
                    </div>
                    <div className="customerComment col-xs-8">mong muốn có được nhiều sản phẩm chất lượng tốt
                      hơn
                    </div>
                  </div>
                  <div className="commentDate text-right">24/03/2017</div>
                </li>
                <li className="text-left">
                  <div className="col-xs-12">
                    <div className="customerName col-xs-4"><i className="fa fa-tags"/>&nbsp;Nguyễn Phương Mai
                    </div>
                    <div className="customerComment col-xs-8">sản phẩm dùng rất tốt</div>
                  </div>
                  <div className="commentDate text-right">24/03/2017</div>
                </li>
                <li className="text-left">
                  <div className="col-xs-12">
                    <div className="customerName col-xs-4"><i className="fa fa-tags"/>&nbsp;Mai Thanh Hà</div>
                    <div className="customerComment col-xs-8">dùng được</div>
                  </div>
                  <div className="commentDate text-right">24/03/2017</div>
                </li>
                <li className="text-left">
                  <div className="col-xs-12">
                    <div className="customerName col-xs-4"><i className="fa fa-tags"/>&nbsp;Đặng Thị Hồng</div>
                    <div className="customerComment col-xs-8">sản phẩm dùng ổn</div>
                  </div>
                  <div className="commentDate text-right">24/03/2017</div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default CustomerComment;
