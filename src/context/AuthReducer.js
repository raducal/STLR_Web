export default (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      let token = action.payload.token;
      localStorage.setItem(
        "login",
        JSON.stringify({ token, isAuthenticated: true })
      );
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      };
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("login");
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        events: action.payload.event,
        store: action.payload.store
      };
    default:
      return state;
  }
};
