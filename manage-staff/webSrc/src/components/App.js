import React from 'react';
import PropTypes from 'prop-types';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  componentDidUpdate(){
    this.runInit();
  }

  runInit(){
    window.scrollTo(0,0);
    $('.customJS').remove();
    $('.simplyscrollJS').remove();
    let scroller = $("#scroller").clone();
    $("#scroller").remove();
    let bxslider1 = $(".bxslider1").clone();
    $(".bxslider1").remove();

    const script = document.createElement("script");
    script.className = 'customJS';
    script.src = "../../libs/custom.js";
    script.async = true;
    document.body.appendChild(script);

    const script1 = document.createElement("script");
    script1.className = 'simplyscrollJS';
    script1.src = "../../libs/jquery.simplyscroll.min.js";
    script1.async = true;
    document.body.appendChild(script1);


    $('#bxslider1Div').append(bxslider1);
    bxslider1.bxSlider({
      pager: !1,
      controls: !0,
      moveSlides: 1,
      hideControlOnEnd: !0,
      infiniteLoop: !0,
      auto: !0,
      pause: 7e3,
      speed: 2e3
    });

    $('#scrollerDiv').append(scroller);
    scroller.simplyScroll({orientation: 'vertical'});
    $(".i4ewOd-pzNkMb-haAclf").hide();
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
