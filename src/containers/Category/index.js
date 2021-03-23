/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index for the category page of the admin panel.
 */

//libraries
import {Container, Row, Col, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowDown,
    IoIosArrowForward,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io';

//class objects
import {
    getAllCategories,
    createCategory,
    updateCategories,
    deleteCategories as deleteCategoriesAction
} from '../../actions/category.actions';
import Layout from '../../components/Layout';
import Modal from '../../components/UI/Modal';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import CreateCategoryModal from './components/CreateCategoryModal';
import './style.css';


const Category = (props) => {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryParent, setCategoryParent] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const handleClose = () => {

        const form = new FormData();

        // if(categoryName == ''){
        //     alert('Name is required');
        //     return;
        // }
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

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category.value)
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == 'checked') {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? {...item, [key]: value} : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? {...item, [key]: value} : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parent: category.parent,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parent ? item.parent : '');
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parent ? item.parent : '');
            form.append('type', item.type);
        });

        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
        const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        dispatch(deleteCategoriesAction(checkedIdsArray))
            .then(result => {
                if (result) {
                    dispatch(getAllCategories())
                    setDeleteCategoryModal(false)
                }
            });
        setDeleteCategoryModal(false);
    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Confirm"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >

                <h5>Expanded</h5>
                {expandedArray.map((item, index) => <span key={index}>{item.name}</span>)}
                <h5>Checked</h5>
                {checkedArray.map((item, index) => <span key={index}>{item.name}</span>)}

            </Modal>
        );
    }

    const categoryList = createCategoryList(category.categories);

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h3>Category</h3>
                            <div className='actionBtnContainer'>
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd/><span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash/><span>Delete</span></button>
                                <button onClick={updateCategory}><IoIosCloudUpload/><span>Edit</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox/>,
                                uncheck: <IoIosCheckboxOutline/>,
                                halfCheck: <IoIosCheckboxOutline/>,
                                expandClose: <IoIosArrowForward/>,
                                expandOpen: <IoIosArrowDown/>
                            }}
                        />
                    </Col>
                </Row>
            </Container>
            <CreateCategoryModal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryParent={categoryParent}
                setCategoryParent={setCategoryParent}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={'Update Categories'}
                size='lg'
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />
            {renderDeleteCategoryModal()}

        </Layout>
    )
}

export default Category;