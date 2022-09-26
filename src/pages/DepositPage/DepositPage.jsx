import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Radio } from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import validator from 'validator'

import { ButtonPrimary, ButtonSubmit } from '@components/button/ButtonCustom'
import FormCustom from '@components/form/FormCustom'
import ModalCustom from '@components/modal/ModalCustom'
import ResultCustom from '@components/result/ResultCustom'
import userService from '@api/userAPI'


function DepositPage() {
  const history = useHistory()
  const [value, setValue] = useState('VISA')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [depositResult, setDepositResult] = useState(`$`)

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleSubmit = (values) => {
    const newValues = {
      ...values,
      amount: +values.amount,
    }
    userService.deposit(newValues)
      .then(res => {
        if (res.data.deposit) {
          console.log(res.data.deposit)
          setDepositResult(`${res.data.deposit.balance}$`)
          setIsModalVisible(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className='min-h-screen w-full'>
      <div className='lg:w-[1280px] md:w-[720px] w-[480px] mx-auto mt-4'>
        <h2 className='text-center text-text-color-title'>How would like to make the deposit?</h2>
        <FormCustom
          name='deposit'
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete='false'
          className='w-[480px] mx-auto'
        >
          <Form.Item
            label='Payment Method'
            name='paymentMethod'
            value={value}
            initialValue={value}
            rules={[
              {
                validator: (rule, value, callback) => {
                  if (!value) {
                    callback('Please choose one payment method!')
                  } else {
                    callback()
                  }
                },
              },
            ]}
          >
            <Radio.Group onChange={onChange}

            >
              <Radio value='VISA' defaultChecked={true}>
                <img
                  src='https://vietjet.asia/assets/uploads/2017/06/Lợi-ích-từ-việc-sử-dụng-visa-card.png'
                  alt='visa'
                  className='w-fit h-28' />
                />
              </Radio>
              <Radio value='MASTER'>
                <img
                  src='https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_500,h_326/https://taichinh.online/wp-content/uploads/2017/02/the-mastercard.png'
                  alt='master'
                  className='w-fit h-28' />
                />
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label='Amount'
            name='amount'
            rules={[
              {
                validator: (rule, value, callback) => {
                  if (!value) {
                    callback('Please input amount!')
                  } else if (!validator.isNumeric(value)) {
                    callback('Please input a valid amount! (50,100,200,...)')
                  } else if (+value < 20) {
                    callback('Amount must be greater than 20$!')
                  } else {
                    callback()
                  }
                },
              },
            ]}
          >
            <Input placeholder='Amount to deposit' suffix={<DollarOutlined className='text-2xl mt-2' />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <ButtonSubmit
              type='primary'
              htmlType='submit'
            >
              Submit
            </ButtonSubmit>
          </Form.Item>
        </FormCustom>
      </div>
      <ModalCustom
        title={null}
        footer={null}
        visible={isModalVisible}
      >
        <ResultCustom
          status='success'
          title={`Successfully deposit!`}
          subTitle={`Your new balance is ${depositResult}`}
          extra={[
            <ButtonPrimary type='primary' key='console'
                           onClick={() => {
                             history.push('/')
                           }}
            >
              Back to Homepage
            </ButtonPrimary>,
            <ButtonSubmit key='buy'
                          onClick={() => {
                            window.location.reload()
                          }}

            >Deposit Again</ButtonSubmit>,
          ]}
        />
      </ModalCustom>
    </div>
  )
}

export default DepositPage
