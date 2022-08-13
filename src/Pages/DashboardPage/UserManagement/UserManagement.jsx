import React, {useEffect, useState} from 'react'
import adminService from '../../../API/adminAPI'
import {Space, Tag, Select, message} from 'antd'
import TableCustom from '../../../Components/TableCustom/TableCustom'
import {ButtonCustom} from '../../../Components/ButtonCustom/ButtonCustom'
import ModalCustom from '../../../Components/ModalCustom/ModalCustom'
import {Form, Input} from 'antd'
import FormCustom from '../../../Components/FormCustom/FormCustom'
import moment from 'moment'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

const initialState =
    [
        {
            'id': 1,
            'username': 'admin',
            'fullName': 'Admin',
            'birthday': '852076800000',
            'avatar': 'https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360',
            'email': 'admin@gmail.com',
            'phoneNumber': '0987654321',
            'roleName': 'ADMIN',
            'genderId': 1,
            'key': 1,
        },
    ]


function UserManagement(props) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    const [users, setUsers] = useState(initialState)
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [imgURL, setImgURL] = useState()
    const [dataEditBasic, setDataEditBasic] = useState()

    const [isEditingActor, setIsEditingActor] = useState(false)
    // const [dataEditActor, setDataEditActor] = useState(users[0].actor)
    // const [dataEditCategory, setDataEditCategory] = useState(users[0].category)

    const [form] = Form.useForm()


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
            key: 'fullName',
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
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <img src={text} alt='movie' width='40' height='40' />,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Role',
            key: 'roleName',
            dataIndex: 'roleName',
            render: (_, {roleName}) => {
                let color = roleName === 'USER' ? 'green' : 'red'
                return <Tag color={color}>{roleName.toUpperCase()}</Tag>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (<div className='flex flex-col space-y-1'>
                <ButtonPrimary
                    className='px-2 text-[16px] bg-yellow-500 hover:bg-amber-500'
                    onClick={() => {
                        setIsEditingUser(true)
                        setImgURL(record.avatar)
                        const data = {
                            ...record, birthday: moment(+record.birthday).format('yyyy-MM-DD'),
                        }
                        setDataEditBasic(data)
                    }}
                >
                    Edit
                </ButtonPrimary>
                <ButtonDanger className='px-2 text-[16px] bg-red-500 hover:bg-red-600'>
                    Delete
                </ButtonDanger>
            </div>),
        },
    ]

    const fetchUserData = () => {
        adminService.getAllUser()
            .then(res => {
                setUsers(res.data.user)
            })
    }

    const handleSubmit = (values) => {
        const newData = {
            ...values,
            birthday: (new Date(values.birthday).getTime()).toString(),
        }
        console.log(newData)
        adminService.updateUserAdmin(newData)
            .then(res => {
                if(res.data.updateUserAdmin.status) {
                    message.success('Update successfully')
                    setIsEditingUser(false)
                    fetchUserData()
                }
            })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchInput.length > 0) {
                const result = users.filter(item => {
                    return item.username.toLowerCase().includes(searchInput.toLowerCase())
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
            error.innerHTML = '<span class="text-text-color-primary">No movie found!</span>'
        }
    }, [searchResults])

    useEffect(() => {
        form.setFieldsValue(dataEditBasic)
    }, [form, dataEditBasic])

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        fetchUserData()
    }, [])


    return (
        <div>
            <h2 className='text-text-color-secondary text-center text-4xl my-4'>Movie Management</h2>
            <div className='my-4'>
                <label htmlFor='search-movie' className='mr-3'>Search Username</label>
                <input
                    id='search-movie'
                    type='text'
                    placeholder='Admin'
                    className='bg-background-search border-background-search border-0 rounded-xl outline-none'
                    onChange={handleSearch}
                />
            </div>
            <TableCustom columns={columns} dataSource={searchResults ? searchResults : users} />
            {/*Edit Basic Movie Information*/}
            <ModalCustom
                title={null}
                footer={null}
                visible={isEditingUser}
                onCancel={() => {
                    setIsEditingUser(false)
                }}
                getContainer={false}
            >
                <FormCustom
                    form={form}
                    initialValues={dataEditBasic}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    onFinish={handleSubmit}
                >
                    <h3 className='text-2xl text-center text-text-color-secondary'>Edit User Info</h3>
                    <Form.Item
                        label='User ID'
                        name='id'
                    >
                        <Input disabled className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Username'
                        name='username'
                    >
                        <Input className='text-right' disabled/>
                    </Form.Item>

                    <Form.Item
                        label='Full name'
                        name='fullName'
                    >
                        <Input className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Avatar URL'
                        name='avatar'
                    >
                        <Input className='text-right' name='image' onChange={(e) => {
                            setImgURL(e.target.value)
                        }} />
                    </Form.Item>

                    <Form.Item
                        label='Preview avatar'
                        name='previewAvatar'
                    >
                        <img src={imgURL} alt='previewImage' width='40' height='40' />
                    </Form.Item>

                    <Form.Item
                        label='Birthday'
                        name='birthday'
                    >
                        <Input type='date' className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Email'
                        name='email'
                    >
                        <Input className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Role'
                        name='roleName'
                    >
                        <Select className='text-right'>
                            <Select.Option value='ADMIN'>Admin</Select.Option>
                            <Select.Option value='USER'>User</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='Role'
                        name='roleName'
                    >
                        <Select className='text-right'>
                            <Select.Option value='ADMIN'>Admin</Select.Option>
                            <Select.Option value='USER'>User</Select.Option>
                        </Select>
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

                    <Form.Item
                        label='Phone number'
                        name='phoneNumber'
                    >
                        <Input className='text-right'/>
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
        </div>
    )
}

export default UserManagement
