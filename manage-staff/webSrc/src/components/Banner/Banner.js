import React from 'react';
//import {Link} from 'react-router';
import '../../styles/home-page.css';

class Banner extends React.Component {
  render() {
    return (
      <div className="feature-adv container">

        <div className="slider row">
          <div className="bx-wrapper" style={{maxWidth: '100%'}}>
            <div className="bx-viewport" aria-live="polite"
                 style={{width: '100%', overflow: 'hidden', position: 'relative'}}>
              <
                ul style={{
                width: '6215%',
                position: 'relative',
                transitionDuration: '0s',
                transform: 'translate3d(-2530px, 0px, 0px)'
              }}>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} className="bx-clone" aria-hidden="true"><a href="" title="Thông báo chuyển văn phòng"><img
                  src="http://labore.vn/image/catalog/revslider_media_folder/banner-nucos-cells-up.png"
                  alt="Thông báo chuyển văn phòng"/></a></li>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} aria-hidden="true"><a href="#" title="Thời trang nữ - Ưu đãi giảm giá 50%"><img
                  src="http://www.remoingay.com/uploads/banner_ads/20160913110935_73245.png" alt=""/></a></li>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} aria-hidden="false"><a href="#" title="Phụ kiện thời trang nữ - Ưu đãi lên đến 50%"><img
                  src="http://www.remoingay.com/uploads/banner_ads/20160912140916_14316.png"
                  alt="Phụ kiện thời trang nữ - Ưu đãi lên đến 50%"/></a></li>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} aria-hidden="true"><a href="#" title="Thời trang mẹ và bé - Ưu đãi lên đến 50%"><img
                  src="http://www.remoingay.com/uploads/banner_ads/20160912140920_81920.png"
                  alt="Thời trang mẹ và bé - Ưu đãi lên đến 50%"/></a></li>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} aria-hidden="true"><a href="#" title="Thời trang nam - Ưu đãi lên đến 50%"><img
                  src="http://www.remoingay.com/uploads/banner_ads/20160912140949_67323.png"
                  alt="Thời trang nam - Ưu đãi lên đến 50%"/></a></li>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} aria-hidden="true"><a href="#" title="Áo Khoác Nữ"><img
                  src="http://www.remoingay.com/uploads/banner_ads/20160913110919_52645.png" alt=""/></a></li>
                <li style={{
                  display: 'block',
                  float: 'left',
                  listStyle: 'none',
                  position: 'relative',
                  width: '1265px'
                }} className="bx-clone" aria-hidden="true"><a href="#"
                                                              title="Thời trang nữ - Ưu đãi giảm giá 50%"><img
                  src="http://www.remoingay.com/uploads/banner_ads/20160913110935_73245.png" alt=""/></a></li>
              </ul>
            </div>
            <div className="bx-controls bx-has-controls-direction">
              <div className="bx-controls-direction">
                <a className="bx-prev" style={{background: 'none'}} id="slider-prev">Prev</a>
                <a className="bx-next" style={{background: 'none'}} id="slider-next">Next</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
