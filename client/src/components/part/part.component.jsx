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
    <div className="col-lg-4 pb-1">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            <strong>Brand: </strong>
            {brand} - {model}
            <br />
            <strong>Category: </strong>
            {category}
          </p>
          {true ? (
            <div className="row card-link">
              <Link
                to={`/${part.uuid}/update`}
                className="btn btn-primary col-lg-5 mx-auto"
              >
                UPDATE
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-primary col-lg-5 mx-auto"
              >
                DELETE
              </button>
            </div>
          ) : (
            <div className="row card-body">
              {true ? (
                <button className="btn btn-primary col-lg-6 mx-auto">
                  ADD TO CART
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // <div
  //   className="part"
  //   style={{
  //     display: "block",
  //     marginBottom: "20px",
  //     border: "2px solid black",
  //   }}
  // >
  //   <div className="part-data">
  //     <div className="name">Name: {name}</div>
  //     <div className="brand">
  //       Brand: {brand} - {model}
  //     </div>
  //     <div className="category">Category: {category}</div>
  //     <div className="price">Price: ${price}</div>
  //   </div>
  //   <button>ADD TO CART</button>
  //   <div>
  //     <button>
  //       <Link to={`/${part.uuid}/update`}>UPDATE</Link>
  //     </button>
  //     <button onClick={handleDelete}>DELETE</button>
  //   </div>
  // </div>
  //);
};

export default PartComponent;
