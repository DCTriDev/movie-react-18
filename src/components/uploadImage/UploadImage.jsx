import React, { useEffect, useState } from 'react'
import { Form, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { ButtonPrimary } from '../button/ButtonCustom'
import uploadFileService from '@api/uploadFile.api'

function UploadImage(props) {
  const { label, name, url, setUrl } = props

  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState(0)

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options
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
            },
          ])
          onSuccess('Ok')
          onProgress(progress)
        })
    } catch (err) {
      onError({ err })
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
        },
      ])
      setUrl(url)
    }
  }, [url])

  if (defaultFileList.length === 0) return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: 'Please choose image!' }]}
    >
      <Upload
        accept='image/*'
        customRequest={uploadImage}
        listType='picture'
        maxCount={1}
        fileList={defaultFileList}
        className='image-upload-grid'
        defaultFileList={defaultFileList}
        onProgress={({ percent }) => {
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000)
          }
          return setProgress(Math.floor(percent))
        }}
      >
        <ButtonPrimary type='button' className='text-[16px]'><UploadOutlined /> Upload</ButtonPrimary>
      </Upload>
    </Form.Item>
  )

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: 'Please choose image!' }]}
    >
      <Upload
        accept='image/*'
        customRequest={uploadImage}
        listType='picture'
        maxCount={1}
        fileList={defaultFileList}
        className='image-upload-grid'
        defaultFileList={defaultFileList}
        onProgress={({ percent }) => {
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000)
          }
          return setProgress(Math.floor(percent))
        }}
      >
        <ButtonPrimary type='button' className='px-1.5 py-0.5 text-[16px] normal-case '>
          <UploadOutlined /> New Image
        </ButtonPrimary>
      </Upload>
    </Form.Item>
  )
}

export default UploadImage
