import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";

import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.png";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/";
import { withRouter } from "react-router";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: banner1,
    key: 1,
  },
  {
    src: banner2,
    key: 2,
  },
  {
    src: banner3,
    key: 3,
  },
  {
    src: banner4,
    key: 4,
  },
];

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false,
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
    this.setState({ animating: true });
  }

  onExited() {
    this.setState({ animating: false });
  }

  next() {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  changeLanguage = (language) => {
    //fire redux event : actions
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  handleViewMoreInfor = (path) => {
    this.props.history.push(path);
  };

  render() {
    let language = this.props.language;
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img
            src={item.src}
            alt={item.altText}
            style={{ width: "100%", height: "380px", objectFit: "cover" }}
          />
        </CarouselItem>
      );
    });
    return (
      <>
        <div className="homeheader-container">
          <div className="homeheader-content">
            <div className="left-content">
              <div className="header-logo" onClick={() => this.returnToHome()}></div>
            </div>
            <div className="center-content">
              <div
                className="child-content"
                onClick={() => this.handleViewMoreInfor("/infor-specialty")}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.DoctorsSpecialty" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={() => this.handleViewMoreInfor("/infor-clinic")}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.Choose-hospital" />
                </div>
              </div>
              <div
                className="child-content"
                onClick={() => this.handleViewMoreInfor("/infor-doctor")}
              >
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
              </div>
              <span className="language-divider">|</span>
              <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="homeheader-banner container">
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
              interval={3000} // Auto-play interval in milliseconds
              pause={false} // Do not pause on hover
            >
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,

    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
