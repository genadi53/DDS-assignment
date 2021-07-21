import React, { useState, useEffect } from "react";
import axios from "axios";
import PartComponent from "../../components/part/part.component";
const HomePage = () => {
  const [parts, setParts] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/parts",
    })
      .then((res) => {
        //console.log(res);
        setParts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      {parts.map((part) => (
        <PartComponent key={part.uuid} part={part} />
      ))}
    </div>
  );
};

export default HomePage;
