import React, { useContext } from "react";
import cartContext from "../../context/cart.context";
import CartActions from "../../reducers/cart/cart.actions";
import userContext from "../../context/user.context";

const CheckoutPage = () => {
  const { cartState, dispatch } = useContext(cartContext);
  const { userState } = useContext(userContext);
  let totalPrice = 0;

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
      </div>

      {cartState.cartItems.map((item) => {
        totalPrice = totalPrice + item.price * item.quantity;
        console.log(item.name);
        return (
          <div className="checkout-item">
            <span className="name">{item.name}</span>

            <span className="quantity">
              <div className="arrow">&#10094;</div>
              <span className="value">{item.quantity}</span>
              <div className="arrow">&#10095;</div>
            </span>

            <span className="price">{item.price}</span>

            <div className="remove-button">&#10005;</div>
          </div>
        );
      })}

      <div className="total">TOTAL: ${totalPrice}</div>
    </div>
  );
};

export default CheckoutPage;
