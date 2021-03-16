/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the reducer (state manager) for authentication actions.
 */

//class objects
import {authConstants} from "../actions/constants";

//initial state for authentication
const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

//this function updates state variables based on actions / requests
export default (state = initState, action) => {
    console.log(action);

    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState,
                loading: false
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
    }

    return state;
}