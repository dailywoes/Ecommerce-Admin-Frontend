/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for the product page of the admin panel.
 */

//libraries
import {Container, Row, Col, Button, Table} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

//class objects
import {createProduct} from '../../actions';
import Input from "../../components/UI/Input";
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import './style.css';
import {generatePublicUrl} from "../../urlConfig";


const Products = (props) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [images, setImages] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);


    const handleClose = () => {
        const form = new FormData();

        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('desc', desc);
        form.append('category', categoryId);

        for (let pic of images) {
            form.append('image', pic);
        }

        dispatch(createProduct(form));

        setShow(false);
    };
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({value: category._id, name: category.name});
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleProductImages = (e) => {
        setImages([...images, e.target.files[0]]);
    }

    console.log(images);

    const renderProducts = () => {
        return (
            <Table style={{fontSize: 14}} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Description</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>
                {
                    product.products.length > 0 ?
                        product.products.map(product =>
                            <tr onClick={() => showProductDetailsModal(product)} key={product._id}>
                                <td>1</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.desc}</td>
                                <td>{product.category.name}</td>
                            </tr>) : null
                }
                </tbody>
            </Table>
        )
    }

    const renderCreateProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
            >
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
            </Modal>
        );
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailsModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetailsModal(true);
        setProductDetails(product);
    }

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal
                show={productDetailsModal}
                handleClose={
                    handleCloseProductDetailsModal
                }
                modalTitle={'Product Details'}
            >
                <Row>
                    <Col md='6'>
                        <label className='key'>Name</label>
                        <p className='value'>{productDetails.name}</p>
                    </Col>
                    <Col md='6'>
                        <label className='key'>Price</label>
                        <p className='value'>{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <label className='key'>Quantity</label>
                        <p className='value'>{productDetails.quantity}</p>
                    </Col>
                    <Col md='6'>
                        <label className='key'>Category</label>
                        <p className='value'>{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md='12'>
                        <label className='key'>Description</label>
                        <p className='value'>{productDetails.desc}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className='key'>Images</label>
                        <div style={{display: 'flex'}}>
                            {productDetails.images.map(picture =>
                                <div className='productImageContainer'>
                                    <img src={generatePublicUrl(picture.image)}/>
                                </div>
                            )}
                        </div>

                    </Col>
                </Row>
            </Modal>
        )
    }

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
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            {renderCreateProductModal()}
            {renderProductDetailsModal()}
        </Layout>
    )
}

export default Products