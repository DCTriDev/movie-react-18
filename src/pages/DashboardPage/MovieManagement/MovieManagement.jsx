import React, { useEffect, useState } from 'react'
import { message, Space, Tag } from 'antd'
import moment from 'moment'

import useDebounce from '@hooks/useDebounce'
import { ButtonPrimary, ButtonDanger } from '@components/button/ButtonCustom'
import TableCustom from '@components/table/TableCustom'
import ModalUpdateMovie from './ModalUpdateMovie/ModalUpdateMovie'
import ModalUpdateMovieActor from './ModalUpdateMovieActor/ModalUpdateMovieActor'
import ModalUpdateCategory from './ModalUpdateCategory/ModalUpdateCategory'
import { initialStateMovieManagement } from 'src/utils/initialState'
import ModalUpdateSource from './ModalUpdateSource/ModalUpdateSource'
import adminService from '@api/adminAPI'

function MovieManagement() {
  const [movies, setMovies] = useState(initialStateMovieManagement)
  //State for debounce search
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  //State for edit movie basic info
  const [isEditingBasic, setIsEditingBasic] = useState(false)
  const [dataEditBasic, setDataEditBasic] = useState()
  //State for edit movie actor
  const [isEditingActor, setIsEditingActor] = useState(false)
  const [dataEditActor, setDataEditActor] = useState()
  //State for edit movie category
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [dataEditCategory, setDataEditCategory] = useState()
  //State for edit movie source
  const [isEditingSource, setIsEditingSource] = useState(false)
  const [dataEditSource, setDataEditSource] = useState()

  const debounceValue = useDebounce(searchInput)

  const columns = [
    {
      title: 'ID',
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
      render: (_, record) => {
        const { actor } = record
        return (<div className='flex flex-col'>
          {actor.map(({ name, image, id }) => {
            return (<Space key={id} direction='horizontal'>
              <img src={image} alt='actor' width='40' height='50' />
              <span>{name}</span>
            </Space>)
          })}
          <ButtonPrimary
            className='px-2 py-0 text-[16px] bg-yellow-500 hover:bg-amber-500 mt-2 w-fit'
            onClick={() => {
              const newActor = actor.map((actor) => {
                return actor.id
              })
              const newData = { ...record, actor: newActor }
              setDataEditActor(newData)
              setIsEditingActor(true)
            }}
          >
            Edit
          </ButtonPrimary>
        </div>)
      },
    },
    {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
      render: (_, record) => {
        const { category } = record
        return (<div className='flex flex-col gap-2'>
          {category.map((category, index) => {
            return (<Tag color={'green'} key={index} className='w-fit tracking-tight'>
              {category.categoryName}
            </Tag>)
          })}
          <ButtonPrimary
            className='px-2 py-0 text-[16px] bg-yellow-500 hover:bg-amber-500 mt-2 w-fit'
            onClick={() => {
              const newCategory = category.map((category) => {
                return category.id
              })
              setDataEditCategory({ ...record, categoryId: newCategory })
              setIsEditingCategory(true)
            }}
          >
            Edit
          </ButtonPrimary>
        </div>)
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        let color = status === 'Released' ? 'green' : 'red'
        return <Tag color={color} className='tracking-tight'>{status.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Release Date',
      key: 'releaseDate',
      dataIndex: 'releaseDate', render: (_, { releaseDate }) => {
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
            console.log(record, 'record')
            setIsEditingSource(true)
            const data = {
              ...record,
            }
            setDataEditSource(data)
          }}
        >
          Source
        </ButtonPrimary>
        <ButtonPrimary
          className='px-2 text-[16px] bg-yellow-500 hover:bg-amber-500'
          onClick={() => {
            setIsEditingBasic(true)
            const data = {
              ...record, releaseDate: moment(+record.releaseDate).format('yyyy-MM-DD'),
            }
            setDataEditBasic(data)
          }}
        >
          Edit
        </ButtonPrimary>
        <ButtonDanger className='px-2 text-[16px] bg-red-500 hover:bg-red-600'
                      onClick={() => {
                        handleDeleteMovie(record.id)
                      }}
        >
          Delete
        </ButtonDanger>
      </div>),
    },
  ]

  const fetchMovieData = () => {
    adminService.getAllMovie()
      .then(res => {
        const data = res.data.getAllMovieAdmin.map((movie, index) => {
          return {
            ...movie,
            key: index,
          }
        })
        const dataSorted = data.sort((a, b) => {
          return a.id - b.id
        })
        setMovies(dataSorted)
      })
  }

  const handleDeleteMovie = (id) => {
    adminService.deleteMovie(id)
      .then((res) => {
        if (res.data.deleteMovie.status) {
          message.success('Delete successfully!')
          fetchMovieData()
        }
      })
  }

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }

  //Debounce search
  useEffect(() => {
    if (searchInput.length > 0) {
      const result = movies.filter(item => {
        return item.title.toLowerCase().includes(searchInput.toLowerCase())
      })
      setSearchResults(result)
    } else {
      setSearchResults(null)
    }
  }, [debounceValue])

  useEffect(() => {
    const error = document.querySelector('.ant-empty-description')
    if (error) {
      error.innerHTML = '<span class="text-text-color-primary">No movie found!</span>'
    }
  }, [searchResults])

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

      <TableCustom columns={columns} dataSource={searchResults ? searchResults : movies} />

      <ModalUpdateMovie
        visible={isEditingBasic}
        setVisible={setIsEditingBasic}
        initialValues={dataEditBasic}
        fetchMovieData={fetchMovieData}
      />

      <ModalUpdateMovieActor
        visible={isEditingActor}
        setVisible={setIsEditingActor}
        initialValues={dataEditActor}
        fetchMovieData={fetchMovieData}
      />

      <ModalUpdateCategory
        visible={isEditingCategory}
        setVisible={setIsEditingCategory}
        initialValues={dataEditCategory}
        fetchMovieData={fetchMovieData}
      />

      <ModalUpdateSource
        visible={isEditingSource}
        setVisible={setIsEditingSource}
        initialValues={dataEditSource}
        fetchMovieData={fetchMovieData}
      />
    </div>
  )
}

export default MovieManagement
