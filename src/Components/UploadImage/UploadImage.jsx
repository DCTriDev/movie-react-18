import React, {useEffect, useState} from 'react'
import {Form, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {ButtonCustom} from '../ButtonCustom/ButtonCustom'
import uploadFileService from '../../API/uploadFile.api'

const {ButtonPrimary} = ButtonCustom

function UploadImage(props) {
    const {label, name, url, setUrl} = props

    const [defaultFileList, setDefaultFileList] = useState([])
    const [progress, setProgress] = useState(0)

    const uploadImage = async options => {
        const {onSuccess, onError, file, onProgress} = options
        try {
            await uploadFileService.fileUpload(file)
                .then(res => {
                    setUrl(res.data.uploadFile.url)
                    setDefaultFileList([
                        {
                            uid: '1',
                            name: file.name,
                            status: 'done',
                            url: res.data.uploadFile.url,
                            thumbUrl: res.data.uploadFile.url,
                        }
                    ])
                    onSuccess('Ok')
                    onProgress(progress)
                })
        } catch (err) {
            onError({err})
        }
    }

    useEffect(() => {
        if (url) {
            setDefaultFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: url,
                    thumbUrl: url,
                }
            ])
            setUrl(url)
        }
    },[url])

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[{required: true, message: 'Please choose image!'}]}
        >
            <Upload
                accept='image/*'
                customRequest={uploadImage}
                listType='picture'
                maxCount={1}
                fileList={defaultFileList}
                className='image-upload-grid'
                defaultFileList={defaultFileList}
                onProgress={({percent}) => {
                    if (percent === 100) {
                        setTimeout(() => setProgress(0), 1000)
                    }
                    return setProgress(Math.floor(percent))
                }}
            >
                {defaultFileList.length===0 ? <ButtonPrimary type='button' className='text-[16px]'> Choose
                    Image <UploadOutlined /></ButtonPrimary> : <ButtonPrimary type='button' className='px-1.5 py-0.5 text-[16px] normal-case '>Choose Image</ButtonPrimary>}
            </Upload>
        </Form.Item>
    )
}

export default UploadImage
