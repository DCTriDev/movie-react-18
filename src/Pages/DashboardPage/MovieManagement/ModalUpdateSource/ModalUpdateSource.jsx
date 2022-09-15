import React, {useEffect, useState} from 'react'
import FormCustom from '../../../../Components/FormCustom/FormCustom'
import {Form, Image, Input, message} from 'antd'
import ModalCustom from '../../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'
import ModalEditSource from './ModalEditSource/ModalEditSource'
import TableCustom from '../../../../Components/TableCustom/TableCustom'
import ModalAddSource from './ModalAddSource/ModalAddSource'
import adminService from '../../../../API/adminAPI'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateSource(props) {
    const {visible, setVisible, initialValues, fetchMovieData} = props

    const [source, setSource] = useState([])
    //State for edit source
    const [isEditSource, setIsEditSource] = useState(false)
    const [editSourceData, setEditSourceData] = useState([])
    //State for add source
    const [isAddSource, setIsAddSource] = useState(false)

    const [form] = Form.useForm()

    const handleUpdateSource = (values) => {
        const newValues = {
            ...values,
            source: source.map((item) => {
                const {detailSource, source} = item
                return {
                    detailSource,
                    source
                }
            }),
        }
        console.log(newValues)
        adminService.updateMovieSource(newValues)
            .then(res => {
                if (res.data.updateMovieSource) {
                    fetchMovieData()
                    setVisible(false)
                    message.success('Update source successfully!')
                }
                else {
                    message.error('更新失败')
                }
            })
    }

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const handleDeleteSourceItem = (key) => {
        setSource(source.filter((source) => {
            return source.key !== key
        }))
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'none',
            render: (_, __, index) => {
                return index + 1
            },
        },
        {
            title: 'Detail Source',
            dataIndex: 'detailSource',
            key: 'detailSource',
        },
        {
            title: 'Source URL',
            dataIndex: 'source',
            key: 'source',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (<div className='flex flex-col space-y-1'>
                <ButtonPrimary
                    type='button'
                    className='px-2 text-[16px] bg-yellow-500 hover:bg-amber-500'
                    onClick={() => {
                        setIsEditSource(true)
                        const data = {
                            ...record,
                        }
                        setEditSourceData(data)
                    }}
                >
                    Edit
                </ButtonPrimary>
                <ButtonDanger
                    type='button'
                    className='px-2 text-[16px] bg-red-500 hover:bg-red-600'
                    onClick={() => {
                        handleDeleteSourceItem(record.key)
                    }}
                >
                    Delete
                </ButtonDanger>
            </div>),
        },
    ]

    useEffect(() => {
        form.setFieldsValue(initialValues)
        const newSource = initialValues?.movieSource.map((source, index) => {
            return {
                ...source,
                key: index,
            }
        })
        setSource(newSource)
    }, [initialValues])

    useEffect(() => {
        const error = document.querySelector('.ant-empty-description')
        if (error) {
            error.innerHTML = '<span class="text-text-color-primary">No movie found!</span>'
        }
    }, [source])

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [])

    return (
        <ModalCustom
            title={null}
            footer={null}
            visible={visible}
            onCancel={handleCancel}
            getContainer={false}
            forceRender
        >
            <FormCustom
                form={form}
                initialValues={initialValues}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateSource}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Update Source</h3>
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
                    <Input disabled className='text-right' />
                </Form.Item>

                <div className='flex w-full justify-center'>
                    <Image preview={false} width={120} src={initialValues?.image} />
                </div>

                <div className='mt-5'>
                    <p className='text-white text-center '>Source List</p>

                    <ButtonPrimary
                        type='button'
                        onClick={() => {
                            setIsAddSource(true)
                        }}
                    >
                        Add Source
                    </ButtonPrimary>

                    <TableCustom columns={columns} dataSource={source} />
                </div>

                <div className='w-full flex justify-center'>
                    <div className='w-full flex justify-center space-x-40'>
                        <ButtonDanger
                            type='button'
                            onClick={handleCancel}
                        >
                            Cancel
                        </ButtonDanger>
                        <ButtonPrimary
                            type='submit'
                        >
                            Update
                        </ButtonPrimary>
                    </div>
                </div>


            </FormCustom>

            <ModalEditSource
                visible={isEditSource}
                setVisible={setIsEditSource}
                initialValues={editSourceData}
                sourceData={source}
                setSourceData={setSource}
            />

            <ModalAddSource
                visible={isAddSource}
                setVisible={setIsAddSource}
                sourceData={source}
                setSourceData={setSource}
            />

        </ModalCustom>
    )
}

export default ModalUpdateSource
