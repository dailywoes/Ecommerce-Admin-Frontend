/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for the category page of the admin panel.
 */

//libraries
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

//class objects
import {getAllCategories, createCategory} from '../../actions/category.actions';
import Input from "../../components/UI/Input";
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';


const Category = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryParent, setCategoryParent] = useState('');
    const [categoryImage, setCategoryImage] = useState('');


    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', categoryParent);
        form.append('image', categoryImage);
        dispatch(createCategory(form));

        setCategoryName('');
        setCategoryParent('');

        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name});
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <button variant="primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}

                />
                <select
                    className='form-control'
                    value={categoryParent}
                    onChange={(e) => setCategoryParent(e.target.value)}>
                    <option>select category</option>
                    {
                        createCategoryList(category.categories).map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>

                <input type='file' name='categoryImage' onChange={handleCategoryImage}/>

            </Modal>
        </Layout>
    )
}

export default Category;