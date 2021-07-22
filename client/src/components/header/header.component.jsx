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
    let response = await axios({
      method: "get",
      url: "http://localhost:5000/api/logout",
      withCredentials: true,
    }).catch((err) => {
      alert("Error");
      console.log(err);
    });
    console.log(response);
    alert(response.data);
    dispatch({ type: UserActions.SIGN_OUT });
  };

  return (
    <div className="header">
      <div className="container-fluid">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand" style={{ marginLeft: "10px" }}>
            LOGO
          </a>
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

      <div>
        {userState.currentUser ? JSON.stringify(userState) : "No user yet"}
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
