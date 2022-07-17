import React from 'react';
import {Form, Input} from 'antd';
import {useDispatch} from "react-redux";
import {userLoginActionThunk} from "../../../Redux/Slice/userSlice";
import {ButtonCustom} from "../../../Components/ButtonCustom/ButtonCustom";
import FormCustom from "../../../Components/FormCustom/FormCustom";
import {Title} from "../../../Components/Titles/Titles";

const {ButtonSubmit} = ButtonCustom
const {FormTitle} = Title


function FormLogIn() {
    const dispatch = useDispatch()
    const onFinish = (values) => {
        handleSignIn(values)
    };

    const handleSignIn = (values) => {
        dispatch(userLoginActionThunk(values))
    }

    return (
        <div className='flex flex-col justify-center'>
            <FormTitle>LogIn</FormTitle>
            <FormCustom
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
                autoComplete="on"
            >
                <Form.Item
                    label="Username"
                    name="username"
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
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true, message: 'Không được để trống!',
                        },
                        {whitespace: true},
                        {min: 5, message: "Mật khẩu tối thiểu 5 ký tự"},
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <div className='grid-cols-2'>
                    <div className='flex justify-center pb-2'>
                        <ButtonSubmit htmlType="submit">
                            Đăng nhập
                        </ButtonSubmit>
                    </div>
                    <div className='flex justify-center'>
                        <span>Bạn chưa có tài khoản?
                            <a
                                href="/sign-up"
                                className='text-red-500 hover:text-red-600'> Đăng ký ngay
                            </a>
                        </span>
                    </div>
                </div>
            </FormCustom>
        </div>
    );
}

export default FormLogIn;
