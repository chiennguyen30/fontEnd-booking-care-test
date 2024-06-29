import React, { Component } from "react";
import { connect } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/medicalFacility";
import OutstandingDoctor from "./Section/OutstandingDoctor.js";
import HandBook from "./Section/HandBook.js";
import "./homePage.scss";
import About from "./Section/About.js";
import HomeFooter from "./HomeFooter.js";
import Comprehensive from "./Section/Comprehensive.js";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <>
        <HomeHeader isShowBanner={true} />
        <div className="container">
          <Comprehensive settings={settings} />
          <Specialty settings={settings} />
          <MedicalFacility settings={settings} />
          <OutstandingDoctor settings={settings} />
          <HandBook settings={settings} />
          <About />
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
