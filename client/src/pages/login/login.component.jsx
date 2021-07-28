import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import FormInput from "../../components/form-input/form-input.component";
import userContext from "../../context/user.context";
import UserActions from "../../reducers/user/user.actions";
import { login } from "../../utils/user-funcs";

const LogInComponent = () => {
  const initialState = { email: "", password: "" };
  const [userCredentials, setUserCredentials] = useState(initialState);
  const history = useHistory();

  const { userDispatch } = useContext(userContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    const loggedUser = await login(email, password);
    userDispatch({ type: UserActions.SIGN_IN, payload: loggedUser });
    history.push("/");
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

        <button
          type="submit"
          className={"btn btn-primary col-lg-3 mx-auto mt-2"}
        >
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default LogInComponent;
