import React, {useEffect, useState} from 'react'
import FormCustom from '../../../../Components/FormCustom/FormCustom'
import {Form, Input, message, Select} from 'antd'
import ModalCustom from '../../../../Components/ModalCustom/ModalCustom'
import adminService from '../../../../API/adminAPI'
import {ButtonCustom} from '../../../../Components/ButtonCustom/ButtonCustom'

const {Option} = Select
const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateMovieActor(props) {
    const {visible, setVisible, initialValues, fetchMovieData} = props
    const [actors, setActors] = useState([])

    const [form] = Form.useForm()

    const fetchActorData = () => {
        adminService.getAllActor()
            .then(res => {
                setActors(res.data.actor)
            })
    }

    const handleRenderActorOption = () => {
        return actors.map(({name, image, id}) => {
            return (
                <Option key={id} value={id}>
                    <img src={image} alt='actor' width='40' height='50' />
                    <span className='ml-2'>{name}</span>
                </Option>
            )
        })
    }

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    useEffect(() => {
        fetchActorData()
    }, [])

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [form, initialValues])


    const handleUpdateActor = (values) => {
        console.log(values, 'values')
        adminService.updateMovieActor(values)
            .then((res) => {
                if (res.data.updateMovieActor) {
                    message.success('Update successfully!')
                    fetchMovieData()
                    setVisible(false)
                }else {
                    message.error('Update failed!', 3)
                }
            })
    }

    return (
        <ModalCustom
            title={null}
            footer={null}
            visible={visible}
            onCancel={() => {
                setVisible(false)
            }}
            getContainer={false}
            forceRender
        >
            <FormCustom
                form={form}
                initialValues={initialValues}
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateActor}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Update Movie Actor</h3>

                <Form.Item
                    label='Movie ID'
                    name='id'
                >
                    <Input disabled className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Actor'
                    name='actor'
                >
                    <Select className='text-right' mode='multiple'>
                        {
                            handleRenderActorOption()
                        }
                    </Select>
                </Form.Item>

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
        </ModalCustom>
    )
}

export default ModalUpdateMovieActor
