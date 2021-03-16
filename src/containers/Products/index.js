/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for the product page of the admin panel.
 */

//libraries
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

//class objects
import {createProduct} from '../../actions/product.actions';
import Input from "../../components/UI/Input";
import Layout from '../../components/Layout';


const Products = (props) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const category = useSelector(state => state.category);


    const handleClose = () => {
        const form = new FormData();

        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('desc', desc);
        form.append('category', categoryId);

        for(let pic of images){
            form.append('image', pic);
        }

        dispatch(createProduct(form));

        setShow(false);
    };
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for(let category of categories){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleProductImages = (e) => {
        setImages([
            ...images,
            e.target.files[0]
        ]);
    }

    console.log(images);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Products</h3>
                            <button variant="primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder={`Product Name`}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Quantity"
                        value={quantity}
                        placeholder={`Quantity`}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Input
                        label="Price"
                        value={price}
                        placeholder={`Price`}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        label="Description"
                        value={desc}
                        placeholder={`Description`}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <select
                        className='form-control'
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}>
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                    {
                        images.length > 0 ?
                            images.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                    }
                    <input type="file" name="image" onChange={handleProductImages}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products