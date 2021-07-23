import React, { useContext } from "react";
import axios from "axios";
import cartContext from "../../context/cart.context";
import CartActions from "../../reducers/cart/cart.actions";
import userContext from "../../context/user.context";

const CheckoutPage = () => {
  const { cartState, dispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);
  let totalPrice = 0;

  const calculateTotalPrice = (parts) => {
    let total = 0;
    parts.forEach((p) => {
      total = total + p.price * p.quantity;
    });
    return total;
  };

  const handleCheckout = async () => {
    console.log(userState.currentUser.email);
    console.log(cartState.cartItems);

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
    }).catch((err) => {
      alert("Error");
      console.log(err);
    });
  };

  return (
    <div>
      {cartState.cartItems.length !== 0 ? (
        <div>
          <table class="table">
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
                    <td>{p.quantity}</td>
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
