/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the class for processing category actions in the admin panel.
 */

//class objects
import {categoryConstants} from './constants';
import axios from '../helpers/axios';

const getAllCategories = () => {
    return async dispatch => {

        dispatch({type: categoryConstants.GET_ALL_CATEGORIES_REQUEST});
        const res = await axios.get('category/getcategory');
        console.log(res);
        if (res.status === 200) {
            const {categoryList} = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categories: categoryList}
            });
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {error: res.data.error}
            })
        }
    }
}

export const createCategory = (form) => {
    return async dispatch => {
        dispatch({type: categoryConstants.CREATE_NEW_CATEGORY_REQUEST});
        try {
            const res = await axios.post('category/create', form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.CREATE_NEW_CATEGORY_SUCCESS,
                    payload: {category: res.data.category}
                });
            } else {
                dispatch({
                    type: categoryConstants.CREATE_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
        } catch (error) {
            //const {} error.response;
            console.log(error);
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST});
        const res = await axios.post('category/update', form);
        if (res.status === 201) {
            dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS});
            dispatch(getAllCategories());
        } else {
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST});
        const res = await axios.post('category/delete', {
            payload: {
                ids
            }
        });
        if (res.status == 202) {
            dispatch(getAllCategories());
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS});
        } else {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
}

export {
    getAllCategories
}