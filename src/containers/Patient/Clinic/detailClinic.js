import React, { Component } from "react";
import { connect } from "react-redux";
import "./detailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getDetailClinicById } from "../../../services/userServices";
import _ from "lodash";

const renderClinicDetails = (dataDetailClinic) => {
  if (!dataDetailClinic || _.isEmpty(dataDetailClinic)) return null;
  let imageBase64 = [];
  if (dataDetailClinic.image) {
    imageBase64 = Buffer.from(dataDetailClinic.image, "base64").toString("binary");
  }
  return (
    <>
      <div className="img-bg-title-clinic">
        <div
          style={{
            background: `url(${imageBase64}) center center/cover no-repeat`,
            backgroundSize: "contain",
            width: "150px",
            height: "150px",
            borderRadius: "5px",
          }}
        ></div>
        <div style={{ paddingLeft: "20px" }}>
          <h1 style={{ fontSize: 20 }}>{dataDetailClinic.name}</h1>
          <p>{dataDetailClinic.address}</p>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
    </>
  );
};
class detailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  // Gọi hàm getArrDays khi component được mount
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getDetailClinicById({ id });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId,
        });
      }
    }
  }

  // Cập nhật state khi có sự thay đổi từ Redux store hoặc props
  async componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;

    return (
      <div className="detail-clinic-container">
        <HomeHeader />
        <div className="detail-clinic-body">
          <div className="description-clinic">{renderClinicDetails(dataDetailClinic)}</div>
          <div>
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          doctorId={item}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                          isShowCity={true}
                        />
                        {/* <div>ha noi</div> */}
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorIdFormParent={item} />
                      </div>
                      <div className="doctor-extra-infor">
                        <DoctorExtraInfor doctorIdFormParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(detailClinic);
