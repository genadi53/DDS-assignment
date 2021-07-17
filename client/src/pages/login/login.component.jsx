import React, { useState } from "react";
import axios from "axios";
import FormInput from "../../components/form-input/form-input.component";

const LogInComponent = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const login = (email, password) => {
    console.log(email, password);
    axios({
      method: "post",
      data: {
        email,
        password,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/login",
    })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    login(email, password);
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
