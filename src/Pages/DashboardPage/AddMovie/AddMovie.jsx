import React, {useEffect, useRef, useState} from 'react'
import {DatabaseOutlined, DeleteOutlined} from '@ant-design/icons'
import {Form, Input, Select, message, DatePicker} from 'antd'
import FormCustom from '../../../Components/FormCustom/FormCustom'
import adminService from '../../../API/adminAPI'
import {ButtonCustom} from '../../../Components/ButtonCustom/ButtonCustom'
import ModalCustom from '../../../Components/ModalCustom/ModalCustom'
import UploadImage from '../../../Components/UploadImage/UploadImage'
import validator from 'validator'

const {ButtonPrimary, ButtonDanger, ButtonSubmit} = ButtonCustom
const {Option} = Select

function AddMovie(props) {
    const [form] = Form.useForm()

    const [actorData, setActorData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [sourceList, setSourceList] = useState([])
    const [url, setUrl] = useState()
    const [visible, setVisible] = useState(false)

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
            image: url,
            releaseDate: new Date(values.releaseDate).getTime().toString(),
        }

        adminService.insertMovie(newValues)
            .then(res => {
                if(res.data.insertMovie.status){
                    message.success('Add new movie success!', 1)
                    setTimeout(() => {
                        window.location.reload()
                    },1000)
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
    const useResetFormOnCloseModal = ({form, visible}) => {
        const prevVisibleRef = useRef()
        useEffect(() => {
            prevVisibleRef.current = visible
        }, [visible])
        const prevVisible = prevVisibleRef.current
        useEffect(() => {
            if (!visible && prevVisible) {
                form.resetFields()
            }
        }, [form, prevVisible, visible])
    }

    const ModalForm = ({visible, onCancel}) => {
        const [form] = Form.useForm()
        useResetFormOnCloseModal({
            form,
            visible,
        })

        const onOk = () => {
            form.submit()
        }

        return (
            <ModalCustom
                title={null}
                footer={null}
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
            >
                <FormCustom form={form} layout='vertical' name='sourceForm'>
                    <h3 className='text-2xl text-center text-text-color-secondary'>Add Source</h3>
                    <Form.Item
                        name='detailSource'
                        label='Detail Source'
                    >
                        <Input className='text-right' />
                    </Form.Item>
                    <Form.Item
                        name='source'
                        label='Source URL'
                    >
                        <Input className='text-right' />
                    </Form.Item>
                </FormCustom>
                <div className='flex justify-between px-10'>
                    <ButtonDanger onClick={onCancel}>Cancel</ButtonDanger>
                    <ButtonPrimary onClick={onOk}>Submit</ButtonPrimary>
                </div>
            </ModalCustom>
        )
    }

    const showUserModal = () => {
        setVisible(true)
    }

    const hideSourceModal = () => {
        setVisible(false)
    }

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    }

    return (
        <div>
            <h2 className='text-text-color-secondary text-center text-4xl my-4'>Add New Movie</h2>
            <div className='p-6 bg-black rounded-2xl'>
                <FormCustom.Provider
                    onFormFinish={(name, {values, forms}) => {
                        if (name === 'sourceForm') {
                            const {basicForm} = forms
                            const sourceValues = basicForm.getFieldValue('sourceForm') || []
                            setSourceList([...sourceList, values])
                            basicForm.setFieldsValue({
                                sourceForm: [...sourceValues, values],
                            })
                            setVisible(false)
                        }
                    }}
                >
                    <FormCustom
                        name='basicForm'
                        form={form}
                        labelCol={{span: 4}}
                        wrapperCol={{span: 18}}
                        onFinish={handleAddNewMovie}
                    >
                        <Form.Item
                            label='Movie Title'
                            name='title'
                            rules={[
                                {required: true, message: 'Please input Movie Title!'},
                            ]}
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <UploadImage label='Image' name='image' url={url} setUrl={setUrl} />

                        <Form.Item
                            label='Trailer URL'
                            name='trailer'
                            rules={[{
                                validator: (_, value) => {
                                    return validator.isURL(value) ? Promise.resolve() : Promise.reject('Wrong URL format!')
                                }, message: 'Wrong URL format!',
                            }]}
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Director'
                            name='director'
                            rules={[{
                                required: true, message: 'Please input Director!',
                            }]}
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Price'
                            name='price'
                            rules={[{
                                validator: (_, value) => {
                                    return validator.isNumeric(value, 'vi-VN') ? Promise.resolve() : Promise.reject('Wrong number format!')
                                }, message: 'Wrong number format!',
                            }]}
                        >
                            <Input className='text-right' />
                        </Form.Item>

                        <Form.Item
                            label='Description'
                            name='description'
                            rules={[{
                                required: true, message: 'Please input description!',
                            }]}
                        >
                            <Input.TextArea autoSize={{minRows: 4, maxRows: 10}} />
                        </Form.Item>

                        <Form.Item
                            label='Actor (Multiple)'
                            name='actorId'
                            rules={[{
                                required: true, message: 'Please choose at least one actor!',
                            }]}
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
                            rules={[{
                                required: true, message: 'Please choose at least one category!',
                            }]}
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
                            rules={[{
                                required: true, message: 'Required!',
                            }]}
                        >
                            <DatePicker />
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
                            label='Source List'
                            // name='sourceForm'
                            shouldUpdate={(prevValues, curValues) => prevValues.sourceForm !== curValues.sourceForm}
                            rules={[
                                {
                                    validator: () => {
                                        return sourceList.length > 0 ? Promise.resolve() : Promise.reject('No source found!')
                                    }, message: 'No source found!',
                                },
                            ]}
                        >
                            {({getFieldValue, setFieldsValue}) => {
                                const sourceData = getFieldValue('sourceForm') || []
                                const handleDeleteSourceItem = (sourceList, detailSource) => {
                                    const newSourceList = sourceList.filter((source) => {
                                        return source.detailSource !== detailSource
                                    })
                                    setFieldsValue(newSourceList)
                                    setSourceList(newSourceList)
                                }
                                console.log(sourceData)
                                return sourceData.length ? (
                                    <ul className='m-0 py-2 rounded-[2px]' id='source-area'>
                                        {sourceData.map((source, index) => (
                                            <li key={index} className='source text-white list-none'>
                                                <DatabaseOutlined />
                                                <span
                                                    className='text-text-color-title ml-2 mr-4'>{source.detailSource}</span>
                                                <a className='text-red-600 bold'
                                                   onClick={() => {
                                                       setFieldsValue(sourceData.splice(index, 1))
                                                       handleDeleteSourceItem(sourceData, source.detailSource)
                                                   }}
                                                ><DeleteOutlined /></a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Input value='No source yet.' className='text-right' disabled />
                                )
                            }}
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <ButtonSubmit
                                className='px-1.5 py-0.5 text-[16px]'
                                htmlType='button'
                                type='button'
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
