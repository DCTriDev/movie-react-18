import React, {useEffect} from 'react'
import FormCustom from '../../../../../Components/FormCustom/FormCustom'
import {Form, Input} from 'antd'
import ModalCustom from '../../../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../../../Components/ButtonCustom/ButtonCustom'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalEditSource(props) {
    const {visible, setVisible, initialValues, sourceData, setSourceData} = props

    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }

    const handleSubmit = (values) => {
        const newValues = {
            ...initialValues,
            ...values,
        }
        const newSourceData = sourceData.map((item) => {
            if(item.id===initialValues.id) {
                return newValues
            }
            return item
        })
        setSourceData(newSourceData)
        setVisible(false)
        form.resetFields()
    }

    useEffect(() => {
        form.setFieldsValue(initialValues)
    }, [initialValues])

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
                onFinish={handleSubmit}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Edit Source</h3>
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
                            Update
                        </ButtonPrimary>
                    </div>
                </div>

            </FormCustom>
        </ModalCustom>
    )
}

export default ModalEditSource
