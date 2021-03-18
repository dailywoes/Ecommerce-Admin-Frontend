/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the class for all constants regarding the state
             of an action, if an action is requesting, successful, failed,
             etc.
 */

//constants for authentication in the admin panel
export const authConstants = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE'
}

//constants for registration in the admin panel
export const userConstants = {
    USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE: 'USER_REGISTER_FAILURE'
}

//constants for category requests in the admin panel
export const categoryConstants = {
    GET_ALL_CATEGORIES_REQUEST: 'GET_ALL_CATEGORIES_REQUEST',
    GET_ALL_CATEGORIES_SUCCESS: 'GET_ALL_CATEGORIES_SUCCESS',
    GET_ALL_CATEGORIES_FAILURE: 'GET_ALL_CATEGORIES_FAILURE',
    CREATE_NEW_CATEGORY_REQUEST: 'CREATE_NEW_CATEGORY_REQUEST',
    CREATE_NEW_CATEGORY_SUCCESS: 'CREATE_NEW_CATEGORY_SUCCESS',
    CREATE_NEW_CATEGORY_FAILURE: 'CREATE_NEW_CATEGORY_FAILURE'
}

export const productConstants = {
    GET_ALL_PRODUCTS_REQUEST: 'GET_ALL_PRODUCTS_REQUEST',
    GET_ALL_PRODUCTS_SUCCESS: 'GET_ALL_PRODUCTS_SUCCESS',
    GET_ALL_PRODUCTS_FAILURE: 'GET_ALL_PRODUCTS_FAILURE'
}

export const initialDataConstants = {
    GET_ALL_INITIAL_DATA_REQUEST: 'GET_ALL_INITIAL_DATA_REQUEST',
    GET_ALL_INITIAL_DATA_SUCCESS: 'GET_ALL_INITIAL_DATA_SUCCESS',
    GET_ALL_INITIAL_DATA_FAILURE: 'GET_ALL_INITIAL_DATA_FAILURE'
}