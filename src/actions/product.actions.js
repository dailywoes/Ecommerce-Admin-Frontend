/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the class for processing product actions in the admin panel.
 */

//class objects
import axios from '../helpers/axios';

export const createProduct = form => {
    return async dispatch => {
        const res = await axios.post('product/create', form);
        console.log(res);
    }
}