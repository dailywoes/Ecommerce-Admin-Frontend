import Modal from "../../../components/UI/Modal";
import {Col, Row} from "react-bootstrap";
import Input from "../../../components/UI/Input";
import React from "react";

const UpdateCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>Expanded</h6>
                </Col>
            </Row>
            {
                expandedArray.length > 0 &&
                expandedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}

                            />
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.parent}
                                onChange={(e) => handleCategoryInput('parent', e.target.value, index, 'expanded')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                            >
                                <option value=''>Select Type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
            <h6>Checked Categories</h6>
            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}

                            />
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.parent}
                                onChange={(e) => handleCategoryInput('parent', e.target.value, index, 'checked')}>
                                <option>select category</option>
                                {
                                    categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select
                                className='form-control'
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                            >
                                <option value=''>Select Type</option>
                                <option value='store'>Store</option>
                                <option value='product'>Product</option>
                                <option value='page'>Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }
        </Modal>
    )
}

export default UpdateCategoriesModal;