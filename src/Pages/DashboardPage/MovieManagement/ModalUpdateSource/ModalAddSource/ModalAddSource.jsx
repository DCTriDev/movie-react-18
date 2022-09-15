import React from 'react'
import ModalCustom from '../../../../../Components/ModalCustom/ModalCustom'
import FormCustom from '../../../../../Components/FormCustom/FormCustom'
import {Form, Input} from 'antd'
import {ButtonCustom} from '../../../../../Components/ButtonCustom/ButtonCustom'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalAddSource(props) {
    const {visible, setVisible, sourceData, setSourceData} = props

    const [form] = Form.useForm()

    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
    }

    const handleSubmit = (values) => {
        const newValues =[
            ...sourceData
        ]
        newValues.push({
            ...values,
            key: new Date().getTime(),
            id: new Date().getTime(),
        })
        setSourceData(newValues)
        setVisible(false)
    }

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
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleSubmit}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Add Source</h3>
                <Form.Item
                    label='Detail Source'
                    name='detailSource'
                >
                    <Input className='text-right' />
                </Form.Item>

                <Form.Item
                    label='Source URL'
                    name='source'
                >
                    <Input className='text-right' />
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
                            Submit
                        </ButtonPrimary>
                    </div>
                </div>

            </FormCustom>
        </ModalCustom>
    )
}

export default ModalAddSource
