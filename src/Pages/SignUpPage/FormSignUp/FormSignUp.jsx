import React from 'react';
import {Form, Input, message, Select} from 'antd';
import {useHistory} from "react-router-dom";
import userAPI from "../../../API/userAPI";
import {ButtonCustom} from "../../../Components/ButtonCustom/ButtonCustom";
import FormCustom from "../../../Components/FormCustom/FormCustom";
import {Title} from "../../../Components/Titles/Titles";

import validator from "validator";

const {ButtonSubmit} = ButtonCustom
const {Option} = Select;
const {FormTitle} = Title

function FormSignUp() {
    const history = useHistory()

    const onFinish = (values) => {
        handleSignUp(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSignUp = (values) => {
        userAPI.signup(values)
            .then((res) => {
                if (res.status === 200) {
                    message.success("Chúc mừng, bạn đã đăng ký thành công!")
                    history.push('/login')
                }
            })
            .catch((err) => {
                message.error(err.err.response.data.content)
            })
    }

    return (
        <div className='flex flex-col justify-center'>
            <FormTitle>Đăng ký</FormTitle>
            <FormCustom
                name="signup"
                title="Đăng ký"
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
                autoComplete="on">
                <Form.Item
                    label="Họ Tên"
                    name="hoTen"
                    rules={[{
                        required: true, message: 'Không được để trống!',
                    },]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Tài Khoản"
                    name="taiKhoan"
                    rules={[{
                        required: true, message: 'Không được để trống!',
                    }, {whitespace: true}, {min: 3, message: "Tên tài khoản ít nhất 3 ký tự"},]}>
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Mật Khẩu"
                    name="matKhau"
                    rules={[{
                        required: true, message: 'Không được để trống!',
                    }, {whitespace: true}, {min: 8, message: "Mật khẩu tối thiểu 8 ký tự"}, {
                        validator: (rule, value) => {
                            if (value.length !== 0 && value >= 8) {
                                return validator.isStrongPassword(value) ? Promise.resolve() : Promise.reject('Mật khẩu phải có ít nhất 1 chữhoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt')
                            } else {
                                return Promise.resolve()
                            }
                        },
                        message: 'Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 ký tự số và 1 ký tự đặc biệt'
                    }]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        validator: (_, value) => {
                            return validator.isEmail(value) ? Promise.resolve() : Promise.reject('Email không hợp lệ')
                        }, message: 'Email không hợp lệ'
                    },]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Số Điện Thoại"
                    name="soDt"
                    rules={[{
                        validator: (_, value) => {
                            return validator.isMobilePhone(value, 'vi-VN') ? Promise.resolve() : Promise.reject('Số điện thoại không hợp lệ')
                        }, message: 'Số điện thoại không hợp lệ'
                    }]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Mã Nhóm"
                    name="maNhom"
                    initialValue="GP01"
                >
                    <Select
                        placeholder="Chọn Nhóm"
                    >
                        <Option value="GP01">GP01</Option>
                        <Option value="GP02">GP02</Option>
                        <Option value="GP03">GP03</Option>
                        <Option value="GP04">GP04</Option>
                        <Option value="GP05">GP05</Option>
                        <Option value="GP06">GP06</Option>
                        <Option value="GP07">GP07</Option>
                        <Option value="GP08">GP08</Option>
                        <Option value="GP09">GP09</Option>
                        <Option value="GP10">GP10</Option>
                    </Select>
                </Form.Item>

                <div className='grid-cols-2'>
                    <div className='flex justify-center pb-2'>
                        <ButtonSubmit htmlType="submit">
                            Đăng ký
                        </ButtonSubmit>
                    </div>
                    <div className='flex justify-center'>
                        <span>Bạn đã có tài khoản?
                            <a
                                href="/login"
                                className='text-red-500 hover:text-red-600'> Đăng nhập
                            </a>
                        </span>
                    </div>

                </div>
            </FormCustom>
        </div>
    );
}

export default FormSignUp;
