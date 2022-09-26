import React, { useEffect, useState } from 'react'
import { message, Tag } from 'antd'
import moment from 'moment'

import { ButtonDanger, ButtonPrimary } from '@components/button/ButtonCustom'
import TableCustom from '@components/table/TableCustom'
import ModalUpdateUserInfo from './ModalUpdateUserInfo/ModalUpdateUserInfo'
import { initialStateUserManagement } from '@utils/initialState'
import adminService from '@api/adminAPI'

function UserManagement() {
  //State for Debounce Search
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const [users, setUsers] = useState(initialStateUserManagement)
  const [isEditingUser, setIsEditingUser] = useState(false)
  const [dataEditUser, setDataEditUser] = useState()

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
      render: (_, { birthday }) => {
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
      render: (_, { roleName }) => {
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
            const data = {
              ...record, birthday: moment(+record.birthday).format('yyyy-MM-DD'),
            }
            setDataEditUser(data)
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

  const fetchUserData = () => {
    adminService.getAllUser()
      .then(res => {
        const dataWithKey = res.data.user.map((user, index) => {
          return {
            ...user,
            key: index,
          }
        })
        const dataSorted = dataWithKey.sort((a, b) => {
          return a.id - b.id
        })
        setUsers(dataSorted)
      })
  }

  const handleDeleteUser = (id) => {
    adminService.deleteUserAdmin(id)
      .then(res => {
        if (res.data.deleteUserAdmin.status) {
          message.success('Delete successfully!')
          fetchUserData()
        }
      })
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  //Debounce Search
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
      error.innerHTML = '<span class="text-text-color-primary">No user found!</span>'
    }
  }, [searchResults])

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>
      <h2 className='text-text-color-secondary text-center text-4xl my-4'>User Management</h2>
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

      <ModalUpdateUserInfo
        visible={isEditingUser}
        setVisible={setIsEditingUser}
        initialValues={dataEditUser}
        fetchUserData={fetchUserData}
      />
    </div>
  )
}

export default UserManagement
