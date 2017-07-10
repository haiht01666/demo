import '../styles/about-page.css';
import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div id="main">
          <div className="container">
            <div className="row">
              <div className="global-title">
                <h2 className="">Liên hệ</h2>
                <div className="clearfix"/>
              </div>
            {/*<p>Thông tin liên hệ</p>*/}
              {/*<p><strong>Công ty DFG</strong></p>*/}
            {/*<p>Địa chỉ:</p>*/}
            {/*<p>Điện Thoại</p>*/}
            {/*<p>Email:</p>*/}
            {/*<p>Website:</p>*/}
          </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default AboutPage;
