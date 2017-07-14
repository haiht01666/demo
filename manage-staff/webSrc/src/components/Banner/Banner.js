import React from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

require('owl.carousel');
require('owl.carousel/dist/assets/owl.carousel.min.css');
require('owl.carousel/dist/assets/owl.theme.default.min.css');


class Banner extends React.Component {
  componentDidMount() {
    var owl = $('.owl-carousel');
    console.log(owl);
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
