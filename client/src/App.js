import React from "react";
import "./App.css";
import Header from "../src/components/header/header.component";
const App = () => {
  return (
    <div className="App">
      <Header currentUser={false} />
    </div>
  );
};

export default App;
