import React, { useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import CartActions from "../../reducers/cart/cart.actions";
import cartContext from "../../context/cart.context";
import userContext from "../../context/user.context";

const PartComponent = ({ part }) => {
  const { name, brand, model, category, price, quantity } = part;
  const { cartState, dispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);

  let history = useHistory();

  const handleDelete = () => {
    //console.log("dele");
    axios({
      method: "delete",
      withCredentials: true,
      url: `http://localhost:5000/api/parts/${part.uuid}`,
    })
      .then((res) => {
        //console.log(res);
        //console.log(res.data);
        alert(res.data);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const addToCart = () => {
    //console.log(part.quantity);
    const item = cartState.cartItems.find((item) => item.uuid === part.uuid);
    let partToAdd = null;
    //console.log(item);
    if (!item) {
      partToAdd = { uuid: part.uuid, name: part.name, quantity: 1, price };
      dispatch({ type: CartActions.ADD_ITEM, payload: partToAdd, price });
    } else {
      partToAdd = {
        uuid: part.uuid,
        name: part.name,
        quantity: item.quantity + 1,
        price,
      };
      dispatch({ type: CartActions.ADD_ITEM, payload: partToAdd });
    }
    //console.log(cartState);
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
            <br />
            <strong>Price: </strong>${price}
          </p>
          {userState.currentUser && userState.currentUser.isAdmin ? (
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
              <div className="row card-body">
                <div>
                  {quantity === 0 ? (
                    <div>OUT OF STOCK</div>
                  ) : (
                    <button
                      className="btn btn-primary col-lg-6 mx-auto"
                      onClick={addToCart}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="row card-body">
              {userState.currentUser ? (
                <div>
                  {quantity === 0 ? (
                    <div>OUT OF STOCK</div>
                  ) : (
                    <button
                      className="btn btn-primary col-lg-6 mx-auto"
                      onClick={addToCart}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              ) : (
                <div>Log-in to purchase this item!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartComponent;
