import React, {useState} from 'react'
import {Form, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {ButtonCustom} from '../ButtonCustom/ButtonCustom'
import uploadFileService from '../../API/uploadFile.api'

const {ButtonPrimary} = ButtonCustom

function UploadImage(props) {
    const {label, name, url, setUrl} = props

    // const [url, setUrl] = useState()
    const [defaultFileList, setDefaultFileList] = useState([])
    const [progress, setProgress] = useState(0)

    const uploadImage = async options => {
        const {onSuccess, onError, file, onProgress} = options
        try {
            await uploadFileService.fileUpload(file)
                .then(res => {
                    setUrl(res.data.uploadFile.url)
                    onSuccess('Ok')
                    onProgress(progress)
                })
        } catch (err) {
            console.log('Errors: ', err)
            const error = new Error('Some error')
            onError({err})
        }
    }

    const handleOnChange = ({file, fileList, event}) => {
        setDefaultFileList(fileList)
    }


    return (
        <Form.Item
            label={label}
            name={name}
        >
            <Upload
                accept='image/*'
                customRequest={uploadImage}
                onChange={handleOnChange}
                listType='picture'
                maxCount={1}
                // fileList={defaultFileList}
                className='image-upload-grid'
                defaultFileList={defaultFileList}
                onProgress={({percent}) => {
                    if (percent === 100) {
                        setTimeout(() => setProgress(0), 1000)
                    }
                    return setProgress(Math.floor(percent))
                }}
            >
                {defaultFileList.length === 0 ? <ButtonPrimary type='button' className='text-[16px]'> Chose Image <UploadOutlined /></ButtonPrimary> : null}
            </Upload>
        </Form.Item>
    )
}

export default UploadImage
