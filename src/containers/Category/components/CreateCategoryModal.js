import Modal from "../../../components/UI/Modal";
import Input from "../../../components/UI/Input";
import {Col, Row} from "react-bootstrap";
import React from "react";

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        categoryParent,
        setCategoryParent,
        categoryList,
        handleCategoryImage
    } = props;

    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className='form-control-sm'
                    />
                </Col>
                <Col>
                    <select
                        className='form-control form-control-sm'
                        value={categoryParent}
                        onChange={(e) => setCategoryParent(e.target.value)}>
                        <option>select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage}/>
                </Col>
            </Row>
        </Modal>
    )
}

export default AddCategoryModal;