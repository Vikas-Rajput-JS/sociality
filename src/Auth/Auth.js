/*
 * @file: index.js
 * @description: Auth functions here
 * @date: 10 June 2020
 * @author: Poonam
 * */


export const User = (store) => {
    return store.getState().user;
};

/******** Routing authentication middleware ***********/
export const Auth = (store) => {
    // return false;
    return User(store).loggedIn;
};


/******** Set Authorization token in header ***********/
export const setAuthorizationToken = (axios) => {
    let token = localStorage.getItem("token")
    if (token) {
        axios.defaults.headers.Auth = `${token}`;
    } else {
        delete axios.defaults.headers.Auth;
    }
};
