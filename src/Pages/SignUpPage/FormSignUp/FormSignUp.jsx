import React, {useEffect} from 'react';
import {Form, Input, message, Select} from 'antd';
import {useHistory} from "react-router-dom";
import {ButtonCustom} from "../../../Components/ButtonCustom/ButtonCustom";
import FormCustom from "../../../Components/FormCustom/FormCustom";
import {Title} from "../../../Components/Titles/Titles";

import validator from "validator";
import localService from "../../../Services/local.service";
import userService from '../../../API/userAPI'

const {ButtonSubmit} = ButtonCustom
const {Option} = Select;
const {FormTitle} = Title

function FormSignUp() {
    const [genderArr, setGenderArr] = React.useState([
        {
            id: 1,
            gender: "Male"
        }
    ])
    const history = useHistory()
    const accessToken = localService.getAccessToken()

    const onFinish = (values) => {
        handleSignUp(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleSignUp = (values) => {
        const newValues = {
            ...values,
            birthday: new Date(values.birthday).getTime().toString()
        }
        console.log(newValues)
        userService.signup(newValues)
            .then(res => {
                if(res.data.signup){
                    message.success('Signup success. Plesae login to continue!', 3)
                    setTimeout(() => {
                        history.push('/login')
                    }, 3000)
                }
            })
    }

    const loginChecking = () => {
        if (accessToken) {
            history.push('/')
        }
    }

    const handleRenderGender = () => {
        return genderArr.map(({gender,id}) => {
            return <Option key={id} value={id}>{gender}</Option>
        })
    }

    useEffect(() => {
        loginChecking()
        userService.getGender()
            .then((res) => {
                setGenderArr(res.data.gender)
            })
    }, []);


    return (
        <div className='flex flex-col justify-center'>
            <FormTitle className='text-text-color-secondary'>Sign Up</FormTitle>
            <FormCustom
                name="signup"
                title="Sign Up                                                          "
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
                    label="Full name"
                    name="fullName"
                    rules={[{
                        required: true, message: 'Required!',
                    },]}
                >
                    <Input placeholder='Full name'/>
                </Form.Item>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{
                        required: true, message: 'Required!',
                    }, {whitespace: true}, {min: 5, message: "At least 5 characters"},]}
                >
                    <Input placeholder='Username'/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true, message: 'Required!',
                    }, {whitespace: true}, {min: 5, message: "At least 5 characters"}, {
                        validator: (rule, value) => {
                            if (value.length !== 0 && value >= 8) {
                                return validator.isStrongPassword(value) ? Promise.resolve() : Promise.reject('At least one uppercase, lowercase, number and special character')
                            } else {
                                return Promise.resolve()
                            }
                        },
                        message: 'At least one uppercase, lowercase, number and special character'
                    }]}>
                    <Input.Password placeholder='Password'/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{
                        validator: (_, value) => {
                            return validator.isEmail(value) ? Promise.resolve() : Promise.reject('Wrong email format')
                        }, message: 'Wrong email format'
                    },]}
                >
                    <Input placehodler='Email'/>
                </Form.Item>

                <Form.Item
                    label="Phone number"
                    name="phoneNumber"
                    rules={[{
                        validator: (_, value) => {
                            return validator.isMobilePhone(value, 'vi-VN') ? Promise.resolve() : Promise.reject('Wrong phone number format')
                        }, message: 'Wrong phone number format'
                    }]}
                >
                    <Input placeholder='Phone number'/>
                </Form.Item>

                <Form.Item
                    label="Birthday"
                    name="birthday"
                    initialValue={new Date()}
                >
                   <Input type='date' placeholder='Birthday'/>
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="genderId"
                    initialValue={1}
                >
                    <Select
                        placeholder="Select gender"
                    >
                        {
                            handleRenderGender()
                        }
                    </Select>
                </Form.Item>

                <div className='grid-cols-2'>
                    <div className='flex justify-center pb-2'>
                        <ButtonSubmit htmlType="submit">
                            Sign Up
                        </ButtonSubmit>
                    </div>
                    <div className='flex justify-center'>
                        <span className='text-text-color-title'>You have an account?
                            <a
                                href="/login"
                                className='text-red-500 hover:text-red-600'> Login
                            </a>
                        </span>
                    </div>

                </div>
            </FormCustom>
        </div>
    );
}

export default FormSignUp;
