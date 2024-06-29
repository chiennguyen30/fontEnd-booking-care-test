import React, { Component } from "react";
import { connect } from "react-redux";
import logoHotpital from "../../../assets/images/161905-iconkham-chuyen-khoa.png";
import logoTongQuan from "../../../assets/images/161350-iconkham-tong-quan.png";
import logoTinhThan from "../../../assets/images/161403-iconsuc-khoe-tinh-than.png";
import logoTuXa from "../../../assets/images/161817-iconkham-tu-xa.png";
import logoYhoc from "../../../assets/images/161340-iconxet-nghiem-y-hoc.png";
import logoNhaKhoa from "../../../assets/images/161410-iconkham-nha-khoa.png";
import "./Comprehensive.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
class Comprehensive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {}

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}
  handleTest = () => {
    this.props.history.push(`/infor-specialty`);
  };
  render() {
    return (
      <>
        <div className="section-share section-comprehensive">
          <div className="section-container">
            <div className="item-comprehensive" onClick={() => this.handleTest()}>
              <div className="child-item">
                <div className="icon-child">
                  <img src={logoHotpital} alt="" style={{ width: "50px" }} />
                </div>
                <div className="text-child">
                  <b>
                    <FormattedMessage id="banner.Specialized-examination" />
                  </b>
                </div>
              </div>
            </div>
            <div className="item-comprehensive">
              <div className="child-item">
                <div className="icon-child">
                  <img src={logoTuXa} alt="" style={{ width: "50px" }} />
                </div>
                <div className="text-child">
                  <b>
                    <FormattedMessage id="banner.Telemedicine" />
                  </b>
                </div>
              </div>
            </div>
            <div className="item-comprehensive">
              <div className="child-item">
                <div className="icon-child">
                  <img src={logoTongQuan} alt="" style={{ width: "50px" }} />
                </div>
                <div className="text-child">
                  <b>
                    <FormattedMessage id="banner.General-examination" />
                  </b>
                </div>
              </div>
            </div>
          </div>
          <div className="section-container">
            <div className="item-comprehensive">
              <div className="child-item">
                <div className="icon-child">
                  <img src={logoTinhThan} alt="" style={{ width: "50px" }} />
                </div>
                <div className="text-child">
                  <b>
                    <FormattedMessage id="banner.Mental-health" />
                  </b>
                </div>
              </div>
            </div>
            <div className="item-comprehensive">
              <div className="child-item">
                <div className="icon-child">
                  <img src={logoNhaKhoa} alt="" style={{ width: "50px" }} />
                </div>
                <div className="text-child">
                  <b>
                    <FormattedMessage id="banner.Dental-examination" />
                  </b>
                </div>
              </div>
            </div>
            <div className="item-comprehensive">
              <div className="child-item">
                <div className="icon-child">
                  <img src={logoYhoc} alt="" style={{ width: "50px" }} />
                </div>
                <div className="text-child">
                  <b>
                    <FormattedMessage id="banner.Medical-tests" />
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comprehensive));
