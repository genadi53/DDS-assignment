import React, { useState } from "react";
import { useHistory } from "react-router";
import FormInput from "../../components/form-input/form-input.component";
import { signup } from "../../utils/user-funcs";

const SignUpComponent = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } = userCredentials;

    if (password !== confirmPassword) {
      alert(`Passwords do not match`);
      return;
    }

    await signup(userCredentials);
    history.push("/");
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h1>Sign-Up</h1>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          name="firstName"
          type="text"
          value={userCredentials.firstName}
          handleChange={handleChange}
          label="First Name"
          required
        />

        <FormInput
          name="lastName"
          type="text"
          value={userCredentials.lastName}
          handleChange={handleChange}
          label="Last Name"
          required
        />

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

        <FormInput
          name="confirmPassword"
          type="password"
          value={userCredentials.confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />

        <button
          type="submit"
          className={"btn btn-primary col-lg-3 mx-auto mt-2"}
        >
          {" "}
          SIGN UP{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUpComponent;
