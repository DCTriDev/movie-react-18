import React, {useState} from 'react'
import FormCustom from '../../../../../Components/FormCustom/FormCustom'
import UploadImage from '../../../../../Components/UploadImage/UploadImage'
import ModalCustom from '../../../../../Components/ModalCustom/ModalCustom'
import {ButtonCustom} from '../../../../../Components/ButtonCustom/ButtonCustom'
import userService from '../../../../../API/userAPI'
import localService from '../../../../../Services/local.service'

const {ButtonPrimary, ButtonDanger} = ButtonCustom

function ModalUpdateAvatar(props) {
    const {visible, setVisible} = props
    const [urlAvatar, setUrlAvatar] = useState()


    const handleUpdateAvatar = (values) => {
        const newValues= {...values, avatar:urlAvatar}
        console.log(newValues)
        console.log('click submit')
        userService.updateAvatar(newValues)
            .then(res => {
                if (res.data.updateAvatar) {
                    setVisible(false)
                    setUrlAvatar(res.data.updateAvatar.avatar)
                    localService.refreshAvatar(urlAvatar)
                    window.location.reload()
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
        >
            <FormCustom
                labelCol={{span: 6}}
                wrapperCol={{span: 18}}
                onFinish={handleUpdateAvatar}
            >
                <h3 className='text-2xl text-center text-text-color-secondary'>Choose Avatar</h3>

                <UploadImage label='Avatar' name='avatar' url={urlAvatar} setUrl={setUrlAvatar}/>

                <div className='w-full flex justify-end '>
                    <ButtonPrimary
                        type='submit'
                        className='mr-10'
                    >
                        Submit
                    </ButtonPrimary>
                </div>
            </FormCustom>
            <div className='absolute bottom-6 left-16'>
                <ButtonDanger
                    onClick={() => {
                        setVisible(false)
                    }}
                >
                    Cancel
                </ButtonDanger>
            </div>
        </ModalCustom>
    )
}

export default ModalUpdateAvatar
