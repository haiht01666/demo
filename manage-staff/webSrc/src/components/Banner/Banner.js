import React from 'react';
//import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/commonActions';


require('owl.carousel');
require('owl.carousel/dist/assets/owl.carousel.min.css');
require('owl.carousel/dist/assets/owl.theme.default.min.css');


class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.count != 0) {
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
    }
  }


  componentDidUpdate() {
    this.props.actions.setBannerCount(1);
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
                    src={'http://localhost:8080' + item} alt=""/>
                </div>
              );
            })
          }
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
    banner: state.common.banner,
    count: state.common.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Banner);
