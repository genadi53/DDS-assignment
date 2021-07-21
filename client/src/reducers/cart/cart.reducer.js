import CartActions from "./cart.actions";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActions.ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case CartActions.REMOVE_ITEM:
      return {
        ...state,
        cartItems: [],
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

export default cartReducer;
