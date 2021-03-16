/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the reducer (state manager) for category actions.
 */

//class objects
import {categoryConstants} from "../actions/constants";

//initial state for categories
const initState = {
    categories: [],
    loading: false,
    error: null
};

const buildNewCategories = (parent, categories, category) => {
    let myCategories = [];

    for (let cat of categories) {
        if (cat._id == parent) {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(
                    parent, [...cat.children,
                        {
                            _id: category._id,
                            name: category.name,
                            slug: category.slug,
                            parentId: category.parentId,
                            children: category.children
                        }], category) : []
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parent, cat.children, category) : []
            });
        }

    }
    return myCategories;
}

//this function updates state variables based on actions / requests
export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.CREATE_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.CREATE_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category)
            console.log(updatedCategories);

            state = {
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstants.CREATE_NEW_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
    }
    return state;
}