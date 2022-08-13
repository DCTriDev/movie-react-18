import React, {useEffect, useState} from 'react'
import adminService from '../../../API/adminAPI'
import {Tag, Select, message} from 'antd'
import TableCustom from '../../../Components/TableCustom/TableCustom'
import {ButtonCustom} from '../../../Components/ButtonCustom/ButtonCustom'
import ModalCustom from '../../../Components/ModalCustom/ModalCustom'
import {Form, Input} from 'antd'
import FormCustom from '../../../Components/FormCustom/FormCustom'
import moment from 'moment'

const {ButtonPrimary, ButtonDanger, ButtonSubmit} = ButtonCustom

const initialState = [
    {
        'id': 1,
        'name': 'Vin Diesel',
        'image': 'https://upload.wikimedia.org/wikipedia/commons/7/71/Vin_Diesel_XXX_Return_of_Xander_Cage_premiere.png',
        'birthday': '-77587200000',
        'genderId': 1,
        'key': 1,
    },
]

function ActorManagement(props) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    const [actors, setActors] = useState(initialState)
    const [isEditingActor, setIsEditingActor] = useState(false)
    const [imgURL, setImgURL] = useState()
    const [dataActorEdit, setDataEditActor] = useState()

    const [isCreatingActor, setIsCreatingActor] = useState(false)

    const [form] = Form.useForm()

    const [formCreate] = Form.useForm()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Birthday',
            key: 'birthday',
            dataIndex: 'birthday',
            render: (_, {birthday}) => {
                return <span>{moment(+birthday).format('DD/MM/YYYY')}</span>
            },
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt='movie' height='60' />,
        },
        {
            title: 'Gender',
            key: 'gender',
            dataIndex: 'genderId',
            render: (_, {genderId}) => {
                let color = genderId === 1 ? 'green' : 'red'
                if (genderId === 1) {
                    return <Tag color={color}>Male</Tag>
                }
                return <Tag color={color}>Female</Tag>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (<div className='flex flex-col space-y-1'>
                <ButtonPrimary
                    className='px-2 text-[16px] bg-yellow-500 hover:bg-amber-500'
                    onClick={() => {
                        setIsEditingActor(true)
                        setImgURL(record.image)
                        const data = {
                            ...record, birthday: moment(+record.birthday).format('yyyy-MM-DD'),
                        }
                        setDataEditActor(data)
                    }}
                >
                    Edit
                </ButtonPrimary>
                <ButtonDanger className='px-2 text-[16px] bg-red-500 hover:bg-red-600'
                              onClick={() => {
                                  handleDeleteUser(record.id)
                              }}
                >
                    Delete
                </ButtonDanger>
            </div>),
        },
    ]

    const fetchActorData = () => {
        adminService.getAllActor()
            .then(res => {
                setActors(res.data.actor)
            })
    }

    const handleUpdateActorInfo = (values) => {
        const newData = {
            ...values,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        adminService.updateActor(newData)
            .then(res => {
                if (res.data.updateActor.status) {
                    message.success('Update successfully!')
                    setIsEditingActor(false)
                    fetchActorData()
                }
            })
    }

    const handleDeleteUser = (id) => {
        adminService.deleteActor(id)
            .then(res => {
                if (res.data.deleteActor.status) {
                    message.success('Delete successfully!')
                    fetchActorData()
                }
            })
    }

    const handleInsertActor = (values) => {
        const newData = {
            ...values,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        adminService.insertActor(newData)
            .then(res => {
                if (res.data.insertActor.status) {
                    message.success('Add successfully!')
                    setIsCreatingActor(false)
                    fetchActorData()
                    formCreate.resetFields()
                    setImgURL(null)
                }
            })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchInput.length > 0) {
                const result = actors.filter(item => {
                    return item.name.toLowerCase().includes(searchInput.toLowerCase())
                })
                setSearchResults(result)
            } else {
                setSearchResults(null)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchInput])

    useEffect(() => {
        const error = document.querySelector('.ant-empty-description')
        if (error) {
            error.innerHTML = '<span class="text-text-color-primary">No actor found!</span>'
        }
    }, [searchResults])

    useEffect(() => {
        form.setFieldsValue(dataActorEdit)
        formCreate.setFieldsValue(null)
    }, [form, dataActorEdit, formCreate])

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        fetchActorData()
    }, [])


    return (
        <div>
            <h2 className='text-text-color-secondary text-center text-4xl my-4'>Actor Management</h2>
            <div className='my-4 space-x-1'>
                <>
                    <label htmlFor='search-movie' className='mr-3'>Search Actor</label>
                    <input
                        id='search-movie'
                        type='text'
                        placeholder='Vin Diesel'
                        className='bg-background-search border-background-search border-0 rounded-xl outline-none'
                        onChange={handleSearch}
                    />
                </>
                <ButtonSubmit className='px-2.5 py-1'
                               onClick={() => {
                    setIsCreatingActor(true)
                }}>
                    New Actor
                </ButtonSubmit>
            </div>

            <TableCustom columns={columns} dataSource={searchResults ? searchResults : actors} />

            <ModalCustom
                title={null}
                footer={null}
                visible={isEditingActor}
                onCancel={() => {
                    setIsEditingActor(false)
                }}
                getContainer={false}
            >
                <FormCustom
                    form={form}
                    initialValues={dataActorEdit}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    onFinish={handleUpdateActorInfo}
                >
                    <h3 className='text-2xl text-center text-text-color-secondary'>Edit Actor Info</h3>
                    <Form.Item
                        label='Actor ID'
                        name='id'
                    >
                        <Input disabled className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Name'
                        name='name'
                    >
                        <Input className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Birthday'
                        name='birthday'
                    >
                        <Input type='date' className='text-right' />
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
                        label='Preview avatar'
                        name='previewAvatar'
                    >
                        <img src={imgURL} alt='previewImage' height='120' />
                    </Form.Item>

                    <Form.Item
                        label='Gender'
                        name='genderId'
                    >
                        <Select className='text-right'>
                            <Select.Option value={1}>Male</Select.Option>
                            <Select.Option value={2}>Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <div className='w-full flex justify-center'>
                        <ButtonPrimary
                            type='submit'
                        >
                            Update
                        </ButtonPrimary>
                    </div>
                </FormCustom>
            </ModalCustom>

            <ModalCustom
                title={null}
                footer={null}
                visible={isCreatingActor}
                onCancel={() => {
                    setIsCreatingActor(false)
                }}
                getContainer={false}
            >
                <FormCustom
                    form={formCreate}
                    // initialValues={dataActorCreate}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    onFinish={handleInsertActor}
                >
                    <h3 className='text-2xl text-center text-text-color-secondary'>Add New Actor</h3>
                    <Form.Item
                        label='Name'
                        name='name'
                    >
                        <Input className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Birthday'
                        name='birthday'
                    >
                        <Input type='date' className='text-right' />
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
                        label='Preview avatar'
                        name='previewAvatar'
                    >
                        <img src={imgURL} alt='previewImage' height='120' />
                    </Form.Item>

                    <Form.Item
                        label='Gender'
                        name='genderId'
                    >
                        <Select className='text-right' placeholder='Select gender'>
                            <Select.Option value={1}>Male</Select.Option>
                            <Select.Option value={2}>Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <div className='w-full flex justify-center'>
                        <ButtonPrimary
                            type='submit'
                        >
                            Submit
                        </ButtonPrimary>
                    </div>
                </FormCustom>
            </ModalCustom>
        </div>
    )
}

export default ActorManagement
