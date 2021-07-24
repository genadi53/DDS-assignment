import UserActions from "./user.actions";

export const initialState = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.SIGN_IN:
      // console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case UserActions.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
