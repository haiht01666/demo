import React from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import 'owl.carousel/dist/assets/owl.carousel.css';
require('owl.carousel');
import '../../../node_modules/owl.carousel/dist/assets/owl.carousel.min.css';
import '../../../node_modules/owl.carousel/dist/assets/owl.theme.default.min.css';
require('../../../node_modules/owl.carousel/dist/owl.carousel.min');


class Banner extends React.Component {
  componentDidMount() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
      items: 1,
      loop: true,
      margin: 10,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: false,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 1000
    });
    // $('.play').on('click', function () {
    //   owl.trigger('play.owl.autoplay', [1000])
    // })
    // $('.stop').on('click', function () {
    //   owl.trigger('stop.owl.autoplay')
    // })
  }

  render() {
    return (
      <div className="container">
        <div className="owl-carousel owl-theme my-carousel">
          {
            this.props.banner.map((item, index) => {
              return (
                <div className="owl-item" key={index}>
                  <img
                    src={item.urlImg} alt=""/>
                </div>
              );
            })
          }
          <div className="owl-dots"/>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  banner: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    banner: state.banner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onComponentWillMount() {
    //   dispatch(cartAction.toggleEditorView(false));
    // },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
