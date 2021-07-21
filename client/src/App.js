import React, { useReducer, useContext, useState } from "react";
import "./App.css";
import Header from "../src/components/header/header.component";
import axios from "axios";
import userReducer, { initialState } from "./redusers/user.reduser";
import UserActions from "./redusers/user.actions";
import userContext from "./context/user.context";
import cartContext from "./context/cart.context";

const App = () => {
  const [currentUser, dispatch] = useReducer(userReducer, initialState); // () => 0
  const [user, setUser] = useState(null);

  const getUser = () => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/user",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        alert("Error");
        console.log(err);
      });
  };

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <Header />
        <button
          onClick={() => {
            getUser();
            console.log(user);
          }}
        >
          Submit
        </button>
      </userContext.Provider>
    </div>
  );
};

export default App;
