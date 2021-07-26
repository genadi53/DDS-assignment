import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import FormInput from "../../components/form-input/form-input.component";
import userContext from "../../context/user.context";
import UserActions from "../../reducers/user/user.actions";

const getUser = async () => {
  let response = await axios({
    method: "get",
    url: "http://localhost:5000/api/user",
    withCredentials: true,
  }).catch((err) => {
    alert("Error");
    console.log(err);
  });

  //console.log(response);
  return response;
};

const login = async (email, password) => {
  //console.log(email, password);
  let response = await axios({
    method: "post",
    data: {
      email,
      password,
    },
    withCredentials: true,
    url: "http://localhost:5000/api/login",
  }).catch((err) => {
    alert("Error");
    console.log(err);
  });
  //console.log(response);
  if (response) alert(response.data.status);
  return response ? response.data.user : null;
};

const LogInComponent = () => {
  const initialState = { email: "", password: "" };
  const [userCredentials, setUserCredentials] = useState(initialState);
  const history = useHistory();

  const { dispatch } = useContext(userContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    const loggedUser = await login(email, password);
    // const user = await getUser();
    // console.log(user);
    dispatch({ type: UserActions.SIGN_IN, payload: loggedUser });
    history.push("/");
    // console.log(userState);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="log-in">
      <h1>Log In</h1>

      <form className="log-in-form" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={userCredentials.email}
          handleChange={handleChange}
          label="Email"
          required
        />

        <FormInput
          name="password"
          type="password"
          value={userCredentials.password}
          handleChange={handleChange}
          label="Password"
          required
        />

        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
};

export default LogInComponent;
