import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userServices";
import { withRouter } from "react-router-dom";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {}

  handleViewMoreInforSpecialty = () => {
    this.props.history.push(`/infor-specialty`);
  };
  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  render() {
    const { settings } = this.props;
    let { dataSpecialty } = this.state;
    return (
      <>
        <div>
          <div className="section-share">
            <div className="section-container">
              <div className="section-header">
                <h2>
                  <FormattedMessage id="home-page.Specialist" />
                </h2>
                <button onClick={() => this.handleViewMoreInforSpecialty()}>
                  <FormattedMessage id="home-page.More-infor" />
                </button>
              </div>
              <Slider {...settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <>
                        <div
                          className="section-customize specialty-child"
                          key={index}
                          onClick={() => this.handleViewDetailSpecialty(item)}
                        >
                          <div
                            className="bg-img section-specialty"
                            style={{
                              background: `url(${item.image}) center center/cover no-repeat`,
                              backgroundSize: "contain",
                            }}
                          ></div>
                          <div className="text-sub">{item.name}</div>
                        </div>
                      </>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
