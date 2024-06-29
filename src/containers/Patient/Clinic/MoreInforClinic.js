import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import _ from "lodash"; // Import lodash để sử dụng hàm debounce
import HomeFooter from "../../HomePage/HomeFooter";
import { getAllClinic } from "../../../services/userServices";

class MoreInforClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "", // Từ khóa tìm kiếm nhập bởi người dùng
      filteredData: [], // Dữ liệu phòng khám đã lọc theo từ khóa tìm kiếm
      arrClinic: [],
      loadingFooter: true,
    };
    // Sử dụng lodash debounce để tạo hàm debounce với độ trễ 300ms
    this.debouncedSearch = _.debounce(this.handleSearchClinic, 300);
  }

  // Khi component được mount, thiết lập dữ liệu phòng khám ban đầu vào state
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({ arrClinic: res.data, loadingFooter: false });
    }
    this.setState({ filteredData: this.state.arrClinic });
  }

  handleViewDetailClinic = (item) => {
    this.props.history.push(`/detail-clinic/${item.id}`);
  };

  // Cập nhật từ khóa tìm kiếm vào state và gọi hàm debounce
  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
    this.debouncedSearch(); // Gọi hàm debounce để trì hoãn việc tìm kiếm
  };

  // Lọc dữ liệu phòng khám dựa trên từ khóa tìm kiếm
  handleSearchClinic = () => {
    const { searchQuery, arrClinic } = this.state;

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm, không phân biệt chữ hoa/thường
    const filteredData = arrClinic.filter(
      (item) =>
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({ filteredData }); // Cập nhật dữ liệu đã lọc vào state
  };

  render() {
    const { searchQuery, filteredData, loadingFooter } = this.state;
    return (
      <>
        <div className="more-infor-container">
          <HomeHeader />
          <div className="more-infor container">
            <div className="header-Clinic">
              <div className="title-more-infor">
                <i className="fa fa-home" aria-hidden="true">
                  {" "}
                  /{" "}
                </i>{" "}
                Cơ sở y tế
              </div>
              <div className="search-more-infor">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input
                  type="text"
                  onChange={this.handleSearchChange}
                  value={searchQuery}
                  placeholder="Search by address"
                />
              </div>
            </div>

            <div className="more-infor-body">
              {/* Hiển thị dữ liệu phòng khám đã lọc */}
              {filteredData &&
                filteredData.length > 0 &&
                filteredData.map((item, index) => {
                  return (
                    <div
                      className="more-infor-item"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
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
                      <div className="more-infor-name">
                        {item.name}
                        <p>{item.address}</p>
                      </div>
                    </div>
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

// Hàm mapStateToProps để lấy dữ liệu từ Redux store (nếu có)
const mapStateToProps = (state) => ({});

// Hàm mapDispatchToProps để dispatch các action tới Redux store (nếu có)
const mapDispatchToProps = (dispatch) => {
  return {};
};

// Kết nối component với Redux store và withRouter để có thể sử dụng history
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforClinic));
