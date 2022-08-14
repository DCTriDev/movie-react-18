import React, {useEffect, useRef, useState} from 'react'
import {DatabaseOutlined, SmileOutlined} from '@ant-design/icons'
import { Form, Input, Typography, Select, message } from 'antd';
import FormCustom from '../../../Components/FormCustom/FormCustom'
import adminService from '../../../API/adminAPI'
import {ButtonCustom} from '../../../Components/ButtonCustom/ButtonCustom'
import ModalCustom from '../../../Components/ModalCustom/ModalCustom'

const {ButtonPrimary, ButtonSubmit} = ButtonCustom
const {Option} = Select

function AddMovie(props) {
    const [form] = Form.useForm()

    const [actorData, setActorData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [sourceList, setSourceList] = useState([])
    const [imgURL, setImgURL] = useState('https://www.nodata.co/static/images/homepage/nodata_logo_heavy.png')

    const handleRenderActorOption = () => {
        return actorData.map(({name, image, id}) => {
            return (
                <Option key={id} value={id}>
                    <img src={image} alt='actor' width='40' height='50' />
                    <span className='ml-2'>{name}</span>
                </Option>
            )
        })
    }

    const handleRenderCategoryOption = () => {
        return categoryData.map(({categoryName, id}) => {
            return (
                <Option key={id} value={id}>{categoryName}</Option>
            )
        })
    }

    const handleAddNewMovie = (values) => {
        const newValues = {
            ...values,
            source: sourceList,
            price: +values.price,
            releaseDate: new Date(values.releaseDate).getTime().toString()
        }

        adminService.insertMovie(newValues)
            .then(res => {
                if(res.data.insertMovie.status){
                    message.success('Add new movie success!', 3)
                    setTimeout(() => {
                        window.location.reload()
                    },3000)
                }
            })

    }

    useEffect(() => {
        adminService.getAllActor()
            .then(res => {
                setActorData(res.data.actor)
            })

        adminService.getAllCategory()
            .then(res => {
                setCategoryData(res.data.category)
            })

    }, [])

    // reset form fields when modal is form, closed
    const useResetFormOnCloseModal = ({ form, visible }) => {
        const prevVisibleRef = useRef();
        useEffect(() => {
            prevVisibleRef.current = visible;
        }, [visible]);
        const prevVisible = prevVisibleRef.current;
        useEffect(() => {
            if (!visible && prevVisible) {
                form.resetFields();
            }
        }, [form, prevVisible, visible]);
    };

    const ModalForm = ({ visible, onCancel }) => {
        const [form] = Form.useForm();
        useResetFormOnCloseModal({
            form,
            visible,
        });

        const onOk = () => {
            form.submit();
        };

        return (
            <ModalCustom title={null} visible={visible} onOk={onOk} onCancel={onCancel}>
                <FormCustom form={form} layout="vertical" name="userForm">
                    <Form.Item
                        name="detailSource"
                        label="Detail Source"
                    >
                        <Input className='text-right'/>
                    </Form.Item>
                    <Form.Item
                        name="source"
                        label="Source URL"
                    >
                        <Input className='text-right'/>
                    </Form.Item>
                </FormCustom>
            </ModalCustom>
        );
    };

    const [visible, setVisible] = useState(false);

    const showUserModal = () => {
        setVisible(true);
    };

    const hideSourceModal = () => {
        setVisible(false);
    };


    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    return (
        <div>
            <h2 className='text-text-color-secondary text-center text-4xl my-4'>Add New Movie</h2>
            <div className='p-6 bg-black rounded-2xl'>
                <FormCustom.Provider
                    onFormFinish={(name, { values, forms }) => {
                        if (name === 'userForm') {
                            const { basicForm } = forms;
                            const users = basicForm.getFieldValue('users') || [];
                            setSourceList([...sourceList, values]);
                            basicForm.setFieldsValue({
                                users: [...users, values],
                            });
                            setVisible(false);
                        }
                    }}
                >
                    <FormCustom
                        name='basicForm'
                        form={form}
                        // initialValues={dataEditActor}
                        labelCol={{span: 4}}
                        wrapperCol={{span: 18}}
                        onFinish={handleAddNewMovie}
                    >
                        <Form.Item
                            label='Movie Title'
                            name='title'
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Image URL'
                            name='image'
                        >
                            <Input className='text-right' name='image' onChange={(e) => {
                                setImgURL(e.target.value)
                            }} />
                        </Form.Item>

                        <Form.Item
                            label='Preview Image'
                            name='previewImage'
                        >
                            <img src={imgURL} alt='previewImage' width='60' height='100' />
                        </Form.Item>



                        <Form.Item
                            label='Trailer URL'
                            name='trailer'
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Director'
                            name='director'
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Price'
                            name='price'
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Description'
                            name='description'
                        >
                            <Input.TextArea autoSize={{minRows: 4, maxRows: 10}} />
                        </Form.Item>

                        <Form.Item
                            label='Actor (Multiple)'
                            name='actorId'
                        >
                            <Select className='text-right' mode='multiple' placeholder='Choose actor'>
                                {
                                    handleRenderActorOption()
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label='Category (Multiple)'
                            name='categoryId'
                        >
                            <Select className='text-right' mode='multiple' placeholder='Choose category'>
                                {
                                    handleRenderCategoryOption()
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label='Release Date'
                            name='releaseDate'
                        >
                            <Input type='date' className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Movie Status'
                            name='movieStatusId'
                            initialValue={1}
                        >
                            <Select className='text-right' theme='dark'>
                                <Select.Option value={1}>Released</Select.Option>
                                <Select.Option value={2}>Upcoming</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label='Movie Type'
                            name='movieTypeId'
                            initialValue={1}
                        >
                            <Select className='text-right' theme='dark'>
                                <Select.Option value={1}>Movie</Select.Option>
                                <Select.Option value={2}>Series</Select.Option>
                                <Select.Option value={3}>Anime</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Source List"
                            shouldUpdate={(prevValues, curValues) => prevValues.users !== curValues.users}
                        >
                            {({ getFieldValue }) => {
                                const users = getFieldValue('users') || [];
                                return users.length ? (
                                    <ul>
                                        {users.map((user, index) => (
                                            <li key={index} className="user">
                                                <DatabaseOutlined />
                                                <span className='text-text-color-title'>{user.detailSource}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Typography.Text className="ant-form-text" type="secondary">
                                        ( <SmileOutlined /> No source yet. )
                                    </Typography.Text>
                                );
                            }}
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            {/*<ButtonPrimary htmlType="submit" type="primary">*/}
                            {/*    Submit*/}
                            {/*</ButtonPrimary>*/}
                            <ButtonSubmit
                                htmlType="button"
                                style={{
                                    margin: '0 8px',
                                }}
                                onClick={showUserModal}
                            >
                                Add Source
                            </ButtonSubmit>
                        </Form.Item>

                        <div className='w-full flex justify-end space-x-10'>
                            <ButtonPrimary
                                type='submit'
                                className='mr-10'
                            >
                                Submit
                            </ButtonPrimary>
                        </div>

                        <ModalForm visible={visible} onCancel={hideSourceModal} />
                    </FormCustom>
                </FormCustom.Provider>
            </div>
        </div>
    )
}

export default AddMovie
