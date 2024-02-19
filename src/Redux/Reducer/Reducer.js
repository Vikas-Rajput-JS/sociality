let InitialState= {
    user:[],
    loggedIn:false
}

export default function UserReducer(state=InitialState,action){
            switch (action.type) {
                case 'LOGIN_SUCCESS':
                    return {...state,...{loggedIn:true},...action.data}
                    break;

                case "LOGOUT_SUCCESS":
                return InitialState;
                default:
                    return InitialState
                    break;
            }
}