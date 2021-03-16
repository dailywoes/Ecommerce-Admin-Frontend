/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the reducer (state manager) for user actions.
 */

//class objects
import {userConstants} from '../actions/constants';

//initial state for registrations
const initState = {
    error: null,
    message: '',
    loading: false
}

//this function updates state variables based on actions / requests
export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.error
            }
            break;
    }

    return state;
}