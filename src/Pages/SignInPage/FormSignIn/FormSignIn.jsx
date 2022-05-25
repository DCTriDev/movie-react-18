import React from 'react';
import {Button, Form, Input, message} from 'antd';
import {useDispatch} from "react-redux";
import {userLoginActionThunk} from "../../../Redux/Slice/userSlice";


function FormSignIn() {
    const dispatch = useDispatch()
    const onFinish = (values) => {
        handleSignIn(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSignIn = (values) => {
        dispatch(userLoginActionThunk(values))
    }

    const showErr = (err) => {
        message.error(err)
    }

    return (
        <div className='bg-white px-12 py-6 rounded-xl'>
            <Form
                name="basic"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
            >
                <Form.Item
                    label="Tài Khoản"
                    name="taiKhoan"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Mật Khẩu"
                    name="matKhau"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 11,
                        span: 24,
                    }}
                >
                    <Button className='bg-green-600 hover:bg-green-800 rounded-lg' type="primary" htmlType="submit">
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default FormSignIn;
