import React, { Component } from "react";
import _ from "lodash";

class DescriptionSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullDescription: false,
    };
  }

  // function thay đổi trạng thái
  toggleDescription = () => {
    this.setState((prevState) => ({
      showFullDescription: !prevState.showFullDescription, // Đảo ngược giá trị
    }));
  };

  render() {
    const { data } = this.props;
    const { showFullDescription } = this.state;

    // Tạo đoạn mô tả ngắn bằng cách lấy 200 ký tự đầu từ descriptionHTML
    const shortDescription =
      data && !_.isEmpty(data) // check data tồn tại và không rỗng
        ? data.descriptionHTML.substring(0, 200) // Lấy 200 ký tự đầu
        : "";

    return (
      <div className="description-specialty">
        {data &&
          !_.isEmpty(data) && ( // Nếu data tồn tại và không rỗng
            <div>
              <div
                // Hiển thị HTML nếu showFullDescription = true, hiển thị all, nếu không show "..."
                dangerouslySetInnerHTML={{
                  __html: showFullDescription ? data.descriptionHTML : shortDescription + "...",
                }}
              ></div>
              <p className="hide-and-show-text" onClick={this.toggleDescription}>
                {showFullDescription ? "Thu gọn" : "Xem thêm"}
              </p>
            </div>
          )}
      </div>
    );
  }
}

export default DescriptionSpecialty;
