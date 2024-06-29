import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MoreInfor.scss";
import * as actions from "../../../../store/actions";
import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import { LANGUAGES } from "../../../../utils";
class MoreInforDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      loadingFooter: true,
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    this.props.loadTopDoctors();
  }

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
        loadingFooter: false,
      });
    }
  }
  handleViewDetailDoctor = (item) => {
    this.props.history.push(`/detail-doctor/${item.id}`);
  };
  render() {
    const { language } = this.props;

    let { arrDoctors, loadingFooter } = this.state;

    return (
      <>
        <div className="more-infor-container">
          <HomeHeader />
          <div className="more-infor container">
            <div className="title-more-infor">
              <i class="fa fa-home" aria-hidden="true">
                {" "}
                /
              </i>{" "}
              Bác sĩ nổi bật
            </div>
            <div className="more-infor-body">
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
                    <>
                      <div
                        className="more-infor-item"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div
                          style={{
                            background: `url(${imageBase64}) center center/cover no-repeat`,
                            width: "300px",
                            height: "200px",
                            border: "1px solid #d5d5d5",
                            borderRadius: "5px",
                            marginRight: "20px",
                          }}
                        ></div>
                        <div style={{ marginTop: 20, fontWeight: 600, fontSize: 16 }}>
                          <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                          <p>
                            {language === LANGUAGES.VI
                              ? item.positionData.valueVi
                              : item.positionData.valueEn}
                          </p>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })}
            </div>
          </div>
          {!loadingFooter && <HomeFooter />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforDoctor));
