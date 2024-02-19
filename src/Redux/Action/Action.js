import toast from "react-hot-toast";

export const LOGIN_SUCCESS = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const LOGOUT_SUCCESS = () => {
    localStorage.clear()
   
    return {
    type: "LOGOUT_SUCCESS",

  };
};
