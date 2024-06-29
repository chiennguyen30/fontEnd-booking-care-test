import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { getAllSpecialty } from "../../../services/userServices";
class OutstandingDoctor extends Component {
  constructor() {
    super();
    this.state = {
      arrDoctors: [],
      dataSpecialty: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  async componentDidMount() {
    this.props.loadTopDoctors();
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  handleSeeMoreInfor = () => {
    this.props.history.push(`/infor-doctor`);
  };
  render() {
    const { settings, language } = this.props;
    let { arrDoctors, dataSpecialty } = this.state;

    return (
      <>
        <div className="section-share section-Outstanding-doctor">
          <div className="section-container section-bg-Outstanding-doctor">
            <div className="section-header">
              <h2>
                <FormattedMessage id="home-page.Outstanding-doctor" />
              </h2>
              <button onClick={() => this.handleSeeMoreInfor()}>
                <FormattedMessage id="home-page.More-infor" />
              </button>
            </div>
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = [];
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi}, ${
                    item.lastName + " " + item.firstName
                  }`;
                  let nameEn = `${item.positionData.valueEn}, ${
                    item.firstName + " " + item.lastName
                  }`;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="bg-img section-specialty-OutstandingDoctor"
                        style={{
                          background: `url(${imageBase64}) center center/cover no-repeat`,
                          backgroundSize: "contain",
                        }}
                      ></div>
                      <div className="text-sub">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
