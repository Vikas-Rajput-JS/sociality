let InitialState = {
  user: {},
  loggedIn: false,
};

export function Reducer (state = InitialState, action){
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {user:action.payload,loggedIn:true};
      break;

    case "LOGOUT_SUCCESS":
      return InitialState;
    default:
      return InitialState;
      break;
  }
};


