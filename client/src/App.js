import React, { useReducer } from "react";
import "./App.css";
import Header from "../src/components/header/header.component";
import userReducer, { initialState } from "./reducers/user/user.reducer";
// import UserActions from "./reducers/user/user.actions";
import userContext from "./context/user.context";
// import cartContext from "./context/cart.context";

const App = () => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  return (
    <div className="App">
      <userContext.Provider value={{ userState, dispatch }}>
        <Header />
      </userContext.Provider>
    </div>
  );
};

export default App;
