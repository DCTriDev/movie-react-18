import React, { useState } from 'react'
import { Form, Input, message, Select } from 'antd'

import { ButtonDanger, ButtonPrimary } from '@components/button/ButtonCustom'
import FormCustom from '@components/form/FormCustom'
import ModalCustom from '@components/modal/ModalCustom'
import UploadImage from '@components/uploadImage/UploadImage'
import adminService from '@api/adminAPI'

function ModalCreateActor(props) {
  const { visible, setVisible, fetchActorData } = props
  const [url, setUrl] = useState()

  const [form] = Form.useForm()

  const handleInsertActor = (values) => {
    const newData = {
      ...values,
      image: url,
      birthday: (new Date(values.birthday).getTime()).toString(),
    }

    adminService.insertActor(newData)
      .then(res => {
        if (res.data.insertActor.status) {
          message.success('Add successfully!')
          (false)
          fetchActorData()
          form.resetFields()
          setUrl(null)
        }
      })
  }

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <ModalCustom
      title={null}
      footer={null}
      visible={visible}
      onCancel={handleCancel}
      getContainer={false}
    >
      <FormCustom
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
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

        <UploadImage label='Image' name='image' setUrl={setUrl} />

        <Form.Item
          label='Gender'
          name='genderId'
          initialValue={1}
        >
          <Select className='text-right' placeholder='Select gender'>
            <Select.Option value={1}>Male</Select.Option>
            <Select.Option value={2}>Female</Select.Option>
          </Select>
        </Form.Item>

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
      </FormCustom>
    </ModalCustom>
  )
}

export default ModalCreateActor
