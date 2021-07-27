import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "../../pages/homepage/homepage.component";
import SignUpPage from "../../pages/signup/signup.component";
import LogInPage from "../../pages/login/login.component";
import UpdateForm from "../../pages/part-forms/update-form.component";
import CreateForm from "../../pages/part-forms/create-form.componemnt";
import CheckoutPage from "../../pages/checkout/checkout.component";
import userContext from "../../context/user.context";
import UserActions from "../../reducers/user/user.actions";

const HeaderComponent = () => {
  const { userState, dispatch } = useContext(userContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/api/logout",
        withCredentials: true,
      });
      alert(response.data);
      dispatch({ type: UserActions.SIGN_OUT });
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  return (
    <div className="header">
      <div className="container-fluid">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link
            to={"/"}
            className="navbar-brand"
            style={{ marginLeft: "10px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="currentColor"
              className="bi bi-shop"
              viewBox="-10 -7.5 32 32"
            >
              <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
            </svg>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                HOMEPAGE
              </Link>
            </li>
          </ul>

          {!userState.currentUser ? (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  SIGN UP
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOG IN
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav me-auto">
              {userState.currentUser && userState.currentUser.isAdmin ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to={"/create"} className="nav-link">
                      ADD PART
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      href="/#"
                    >
                      LOGOUT
                    </a>
                  </li>
                </ul>
              ) : (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    href="/#"
                    onClick={(e) => handleLogout(e)}
                  >
                    LOGOUT
                  </a>
                </li>
              )}
            </ul>
          )}

          <ul className="navbar-nav" style={{ marginRight: "10px" }}>
            <li className="nav-item">
              <Link to={"/checkout"} className="nav-link">
                CHECKOUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/login" component={LogInPage} />
          <Route path="/:uuid/update" component={UpdateForm} />
          <Route exact path="/create" component={CreateForm} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/logout" />
        </Switch>
      </div>
    </div>
  );
};

export default HeaderComponent;
