import React, { useReducer } from "react";
import "./App.css";
import Header from "../src/components/header/header.component";
import userReducer, {
  initialState as initialUserState,
} from "./reducers/user/user.reducer";
import cartReducer, {
  initialState as initialCartState,
} from "./reducers/cart/cart.reducer";
import userContext from "./context/user.context";
import cartContext from "./context/cart.context";

const App = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  return (
    <div className="App">
      <userContext.Provider value={{ userState, userDispatch }}>
        <cartContext.Provider value={{ cartState, cartDispatch }}>
          <Header />
        </cartContext.Provider>
      </userContext.Provider>
    </div>
  );
};

export default App;
