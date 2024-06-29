import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MoreInfor.scss";
import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import { getAllSpecialty } from "../../../../services/userServices";
class MoreInforSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialty: [],
      loadingFooter: true,
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        arrSpecialty: res.data,
        loadingFooter: false,
      });
    }
  }

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}
  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  render() {
    let { arrSpecialty, loadingFooter } = this.state;
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
              chuyên khoa khám
            </div>
            <div className="more-infor-body">
              {arrSpecialty &&
                arrSpecialty.length > 0 &&
                arrSpecialty.map((item, index) => {
                  return (
                    <>
                      <div
                        className="more-infor-item"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          style={{
                            background: `url(${item.image}) center center/cover no-repeat`,
                            backgroundSize: "contain",
                            width: "300px",
                            height: "200px",
                            border: "1px solid #d5d5d5",
                            borderRadius: "5px",
                          }}
                        ></div>
                        <div className="more-infor-name">{item.name}</div>
                      </div>
                      <hr />
                    </>
                  );
                })}
            </div>
          </div>
          {!loadingFooter && <HomeFooter />} {/* hiển thị footer khi loading là false */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforSpecialty));
