import React, {useEffect, useState} from 'react'
import adminService from '../../../API/adminAPI'
import {Tag, message} from 'antd'
import TableCustom from '../../../Components/TableCustom/TableCustom'
import {ButtonCustom} from '../../../Components/ButtonCustom/ButtonCustom'
import moment from 'moment'
import ModalUpdateActor from './ModalUpdateActor/ModalUpdateActor'
import ModalCreateActor from './ModalCreateActor/ModalCreateActor'
import {initialStateActorManagement} from '../../../Utils/initialState'

const {ButtonPrimary, ButtonDanger, ButtonSubmit} = ButtonCustom

function ActorManagement(props) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    const [actors, setActors] = useState(initialStateActorManagement)
    const [isEditingActor, setIsEditingActor] = useState(false)
    const [dataActorEdit, setDataEditActor] = useState()

    const [isCreatingActor, setIsCreatingActor] = useState(false)

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
                        const data = {
                            ...record,
                            birthday: moment(+record.birthday).format('yyyy-MM-DD'),
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
                const actorsWithKey = res.data.actor.map((actor,index) => {
                    return {
                        ...actor,
                        key: index
                    }
                })
                const actorsSortedByKey = actorsWithKey.sort((a,b) => {
                    return a.id - b.id
                })
                setActors(actorsSortedByKey)
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

    const handleSearch = (e) => {
        setSearchInput(e.target.value)
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

            <ModalUpdateActor
                visible={isEditingActor}
                setVisible={setIsEditingActor}
                initialValue={dataActorEdit}
                fetchActorData={fetchActorData}
            />

            <ModalCreateActor
                visible={isCreatingActor}
                setVisible={setIsCreatingActor}
                fetchActorData={fetchActorData}/>
        </div>
    )
}

export default ActorManagement
