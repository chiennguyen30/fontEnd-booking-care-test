import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import CustomScrollbars from "../components/CustomScrollbars";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage.js";
import DetailDoctor from "./Patient/Doctor/DetailDoctor.js";
import Doctor from "../routes/Doctor.js";
import Login from "./Auth/Login";
import VerifyEmail from "./Patient/VerifyEmail.js";
import detailSpecialty from "./Patient/Specialty/detailSpecialty.js";
import detailClinic from "./Patient/Clinic/detailClinic.js";
import MoreInforSpecialty from "./HomePage/Section/MoreInfor/MoreInforSpecialty.js";
import MoreInforClinic from "./Patient/Clinic/MoreInforClinic.js";
import MoreInforDoctor from "./HomePage/Section/MoreInfor/MoreInforDoctor.js";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                  <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                  <Route path={"/doctor/"} component={userIsAuthenticated(Doctor)} />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                  <Route path={path.DETAIL_SPECIALTY} component={detailSpecialty} />
                  <Route path={path.DETAIL_CLINIC} component={detailClinic} />
                  <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                  <Route path={path.more.INFOR_SPECIALTY} component={MoreInforSpecialty} />
                  <Route path={path.more.INFOR_CLINIC} component={MoreInforClinic} />
                  <Route path={path.more.INFOR_DOCTOR} component={MoreInforDoctor} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
