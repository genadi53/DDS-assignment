import CartActions from "./cart.actions";

export const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActions.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case CartActions.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case CartActions.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

const addItemToCart = (cartItems, itemToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.uuid === itemToAdd.uuid
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.uuid === itemToAdd.uuid
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const removeItemFromCart = (cartItems, itemToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.uuid === itemToRemove.uuid
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.uuid !== itemToRemove.uuid);
  } else {
    return cartItems.map((item) =>
      item.uuid === itemToRemove.uuid
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

export default cartReducer;
