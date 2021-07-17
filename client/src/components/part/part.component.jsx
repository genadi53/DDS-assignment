import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const PartComponent = ({ part }) => {
  const { name, brand, model, category, price } = part;
  let history = useHistory();

  const handleDelete = () => {
    console.log("dele");
    axios({
      method: "delete",
      withCredentials: true,
      url: `http://localhost:5000/api/parts/${part.uuid}`,
    })
      .then((res) => {
        console.log(res);
        //console.log(res.data);
        alert(res.data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="part"
      style={{
        display: "block",
        marginBottom: "20px",
        border: "2px solid black",
      }}
    >
      <div className="part-data">
        <div className="name">Name: {name}</div>
        <div className="brand">
          Brand: {brand} - {model}
        </div>
        <div className="category">Category: {category}</div>
        <div className="price">Price: ${price}</div>
      </div>
      <button>ADD TO CART</button>
      <div>
        <button>
          <Link to={`/${part.uuid}/update`}>UPDATE</Link>
        </button>
        <button onClick={handleDelete}>DELETE</button>
      </div>
    </div>
  );
};

export default PartComponent;
