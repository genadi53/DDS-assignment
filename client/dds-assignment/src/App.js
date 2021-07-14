import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [responce, setResponce] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setResponce(data.message));
  }, []);

  return (
    <div className="App">
      <p>{responce}</p>
    </div>
  );
};

export default App;
