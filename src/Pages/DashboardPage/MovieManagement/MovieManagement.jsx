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

const initialState = [{
    'id': 1,
    'title': 'Altitude',
    'trailer': 'https://www.youtube.com/watch?v=1TvhM6Neosk',
    'image': 'https://m.media-amazon.com/images/M/MV5BYjRlOWZmOWItN2ZlMi00MWMyLWI5ODUtOTc5YWNjNzViYTNlXkEyXkFqcGdeQXVyMjU3NTI0Mg@@._V1_.jpg',
    'movieSource': [{
        'detailSource': 'FULL', 'id': 1, 'movieId': 1, 'source': 'https://www.youtube.com/watch?v=rzc1PRN6y_g',
    }],
    'price': 20,
    'director': 'Alex Merkin',
    'description': 'FBI agent Gretchen Blair is on a flight to Washington D.C. when the man seated beside her makes an unusual offer. He explains that the plane they\'re on is about to be hijacked, and promises to pay her seventy-five million dollars if she can get him safely back on the ground. When a gang of professional thieves takes control of the plane, she realizes he isn\'t joking. Soon Gretchen finds herself caught in the middle of an elaborate mid-air heist, fighting to save the passengers while the thieves tear the plane apart, searching for the stolen loot hidden somewhere on board.',
    'actor': [{
        'name': 'Denise Richards',
        'image': 'https://m.media-amazon.com/images/M/MV5BMTQyNjYxNDU5OV5BMl5BanBnXkFtZTcwNTY5NDQwOA@@._V1_UX214_CR0,0,214,317_AL_.jpg',
        'id': 3,
    }, {
        'name': 'Dolph Lundgren',
        'image': 'https://m.media-amazon.com/images/M/MV5BMTUyMzEyNzU4NV5BMl5BanBnXkFtZTgwNDg2MzM3MDE@._V1_UX214_CR0,0,214,317_AL_.jpg',
        'id': 4,
    }],
    'category': [{
        'categoryName': 'Action', 'id': 2,
    }, {
        'categoryName': 'Crime', 'id': 9,
    }, {
        'categoryName': 'Thriller', 'id': 11,
    }],
    'status': 'Released',
    'releaseDate': '1492128000000',
    'key': 1,
}]


function MovieManagement(props) {
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    const [movies, setMovies] = useState(initialState)
    const [isEditingBasic, setIsEditingBasic] = useState(false)
    const [imgURL, setImgURL] = useState()
    const [dataEditBasic, setDataEditBasic] = useState()

    const [isEditingActor, setIsEditingActor] = useState(false)
    // const [dataEditActor, setDataEditActor] = useState(movies[0].actor)
    // const [dataEditCategory, setDataEditCategory] = useState(movies[0].category)

    const [form] = Form.useForm()


    const columns = [
        {
            title: 'Movie ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt='movie' width='60' height='100' />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Director',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: 'Actor',
            dataIndex: 'actor',
            key: 'actor',
            render: (_, {actor}) => {
                return (<div className='flex flex-col'>
                    {actor.map(({name, image, id}) => {
                        return (<Space key={id} direction='horizontal'>
                            <img src={image} alt='actor' width='40' height='50' />
                            <span>{name}</span>
                        </Space>)
                    })}
                    <ButtonPrimary
                        className='px-2 py-0 text-[16px] bg-yellow-500 hover:bg-amber-500 mt-2 w-fit'
                        onClick={() => {
                            setDataEditBasic(actor)
                        }}
                    >
                        Edit Actor
                    </ButtonPrimary>
                </div>)
            },
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
            render: (_, {category}) => {
                return (<div className='flex flex-col gap-2'>
                    {category.map((category) => {
                        return (<Tag color={'green'} key={category.id} className='w-fit'>
                            {category.categoryName}
                        </Tag>)
                    })}
                    <ButtonPrimary
                        className='px-2 py-0 text-[16px] bg-yellow-500 hover:bg-amber-500 mt-2 w-fit'
                        onClick={() => {
                            setDataEditBasic(category)
                        }}
                    >
                        Edit Category
                    </ButtonPrimary>
                </div>)
            },
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (_, {status}) => {
                let color = status === 'Released' ? 'green' : 'red'
                return <Tag color={color}>{status.toUpperCase()}</Tag>
            },
        },
        {
            title: 'Release Date',
            key: 'releaseDate',
            dataIndex: 'releaseDate', render: (_, {releaseDate}) => {
                return <span>{moment(+releaseDate).format('DD/MM/YYYY')}</span>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (<div className='flex flex-col space-y-1'>
                <ButtonPrimary
                    className='px-2 text-[16px] bg-yellow-500 hover:bg-amber-500'
                    onClick={() => {
                        setIsEditingBasic(true)
                        setImgURL(record.image)
                        const data = {
                            ...record, releaseDate: moment(+record.releaseDate).format('yyyy-MM-DD'),
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

    const fetchMovieData = () => {
        adminService.getAllMovie()
            .then(res => {
                const data = res.data.getAllMovieAdmin.map(movie => {
                    return {
                        ...movie,
                        key: movie.id,
                    }
                })
                setMovies(data)
            })
    }

    const handleSubmit = (values) => {
        const newData = {
            ...values,
            releaseDate: (new Date(values.releaseDate).getTime()).toString(),
        }
        adminService.updateMovieBasic(newData, true)
            .then((res) => {
                if (res.data.updateMovieBasic) {
                    message.success('Update successfully')
                    fetchMovieData()
                    setIsEditingBasic(false)
                } else {
                    message.error('Update failed!')
                }
            })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchInput.length > 0) {
                const result = movies.filter(item => {
                    return item.title.toLowerCase().includes(searchInput.toLowerCase())
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
        fetchMovieData()
    }, [])


    return (
        <div>
            <h2 className='text-text-color-secondary text-center text-4xl my-4'>Movie Management</h2>
            <div className='my-4'>
                <label htmlFor='search-movie' className='mr-3'>Search Movie</label>
                <input
                    id='search-movie'
                    type='text'
                    placeholder='End game'
                    className='bg-background-search border-background-search border-0 rounded-xl outline-none'
                    onChange={handleSearch}
                />
            </div>
            <TableCustom columns={columns} dataSource={searchResults?searchResults:movies}/>
            {/*Edit Basic Movie Information*/}
            <ModalCustom
                title={null}
                footer={null}
                visible={isEditingBasic}
                onCancel={() => {
                    setIsEditingBasic(false)
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
                    <h3 className='text-2xl text-center text-text-color-secondary'>Editing Basic Info</h3>
                    <Form.Item
                        label='Movie ID'
                        name='id'
                    >
                        <Input disabled className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Title'
                        name='title'
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
                        label='Release Date'
                        name='releaseDate'
                    >
                        <Input type='date' className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Price'
                        name='price'
                    >
                        <Input className='text-right' />
                    </Form.Item>

                    <Form.Item
                        label='Status'
                        name='status'
                    >
                        <Select className='text-right' theme='dark'>
                            <Select.Option value='Released'>Released</Select.Option>
                            <Select.Option value='Upcoming'>Upcoming</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label='Description'
                        name='description'
                    >
                        <Input.TextArea autoSize={{minRows: 4, maxRows: 7}} />
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

export default MovieManagement
