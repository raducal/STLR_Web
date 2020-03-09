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
        isAuthenticated: true,
        token: action.payload.token
      };
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("login");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        events: []
      };
    case "USER_LOADED":
      // console.log(action.payload.event);
      return {
        ...state,
        isAuthenticated: true,
        // events: action.payload.event,
        store: action.payload.store,
        token: action.payload.token
      };
    case "GET_EVENTS":
      return {
        ...state,
        events: action.payload.event,
        loading: false
      };
    default:
      return state;
  }
};
