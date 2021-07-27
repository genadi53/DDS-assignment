import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PartComponent from "../../components/part/part.component";
const HomePage = () => {
  const [parts, setParts] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    axios({
      method: "get",
      url: "http://localhost:5000/api/parts",
    })
      .then((res) => {
        //console.log(res);
        if (isMounted.current) {
          setParts(res.data);
        }
      })
      .catch((err) => console.log(err));
    return () => (isMounted.current = false);
  }, [parts]);

  return (
    <div className="row">
      {parts.map((part) => (
        <PartComponent key={part.uuid} part={part} />
      ))}
    </div>
  );
};

export default HomePage;
