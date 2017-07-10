import React from 'react';
//import {Link} from 'react-router';
import '../../styles/home-page.css';

class NewFeeds extends React.Component {
  render() {
    return (
      <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-center">
        <div className="box">
          <div className="heading-blog">
            <h3>Tư vấn sức khỏe - làm đẹp</h3>
          </div>
          <div className="content-blog">
            <div className="top-widget">
              <div className="thumb">
                <a href="#" title="5 lý do bạn nên chọn hàng hiệu thay vì đồ thiết kế!">
                  <img width="230px" height="150px" src="images/tuvan.jpg" className="" alt="Untitled"/> </a>
              </div>
            </div>
            <div className="as-widget">
              <ul>
                <li>
                  <h3><a href="#" title="Báo Zing New có bài về Hàng Hiệu Sales !!!!">Báo Zing New có bài về
                    Hàng Hiệu Sales !!!!</a></h3>
                </li>
                <li>
                  <h3><a href="#"
                         title="Giảm 5% cho khách thanh toán trực tuyến qua ATM và VISA/MASTER CARD/JCB khi mua hàng">Giảm
                    5% cho khách thanh toán trực tuyến qua ATM và VISA/MASTER CARD/JCB khi mua hàng</a></h3>
                </li>
                <li>
                  <h3><a href="#" title="Hàng Hiệu Sales tham gia chương trình Private Sales">Hàng Hiệu Sales
                    tham gia chương trình Private Sales</a></h3>
                </li>
                <li>
                  <h3><a href="#" title="Hàng Hiệu Sales hợp tác với Leflair">Hàng Hiệu Sales hợp tác với
                    Leflair</a></h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewFeeds;
