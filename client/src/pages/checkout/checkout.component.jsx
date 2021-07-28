import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import cartContext from "../../context/cart.context";
import CartActions from "../../reducers/cart/cart.actions";
import userContext from "../../context/user.context";

const CheckoutPage = () => {
  const { cartState, cartDispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);
  const history = useHistory();
  let totalPrice = 0;

  const calculateTotalPrice = (parts) => {
    let total = 0;
    parts.forEach((p) => {
      total = total + p.price * p.quantity;
    });
    return total;
  };

  const handleCheckout = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/transaction",
        data: {
          email: userState.currentUser.email,
          parts: cartState.cartItems,
          address: "Sofia",
          totalPrice: totalPrice,
        },
        withCredentials: true,
      });
      alert(res.data);
      cartDispatch({
        type: CartActions.CLEAR_CART,
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const addItem = (part) => {
    let partToAdd = cartState.cartItems.find((item) => item.uuid === part.uuid);
    if (!partToAdd) {
      partToAdd = {
        uuid: part.uuid,
        name: part.name,
        quantity: 1,
        price: part.price,
      };
      cartDispatch({
        type: CartActions.ADD_ITEM,
        payload: partToAdd,
      });
    } else {
      partToAdd = {
        ...partToAdd,
        quantity: partToAdd.quantity + 1,
      };
      cartDispatch({ type: CartActions.ADD_ITEM, payload: partToAdd });
    }
  };

  const removeItem = (part) => {
    let partToRemove = cartState.cartItems.find(
      (item) => item.uuid === part.uuid
    );
    if (!partToRemove) {
      alert("NO ITEM TO REMOVE!");
    } else {
      partToRemove = {
        ...partToRemove,
        quantity: partToRemove.quantity - 1,
      };
      cartDispatch({ type: CartActions.REMOVE_ITEM, payload: partToRemove });
    }
  };

  return (
    <div>
      {cartState.cartItems.length !== 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Part</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartState.cartItems.map((p, idx) => {
                totalPrice = totalPrice + p.price * p.quantity;
                return (
                  <tr key={p.uuid}>
                    <th scope="row">{idx}</th>
                    <td>{p.name}</td>
                    <td>
                      <svg
                        onClick={() => removeItem(p)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-left-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                      </svg>
                      {p.quantity}
                      <svg
                        onClick={() => addItem(p)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-caret-right-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                      </svg>
                    </td>
                    <td>${p.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>TOTAL PRICE: ${totalPrice}</div>
          <button
            onClick={handleCheckout}
            className="btn btn-primary col-lg-5 mx-auto"
          >
            PAY NOW
          </button>
        </div>
      ) : (
        <div>ADD ITEMS TO THE CART</div>
      )}
    </div>
  );
};

export default CheckoutPage;
