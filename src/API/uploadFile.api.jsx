import axiosLocal from './axiosFormData'

class uploadFIleAPI {
    fileUpload = (data, setLoading= true) => {
        const payload = new FormData()
        payload.append('query', 'mutation($file:Upload){ \n' +
            'uploadFile(input: {file:$file}){url}\n' +
            '}')
        payload.append('file', data, data.name)
        return axiosLocal.postMethod(payload, setLoading)
    }
}

const uploadFileService = new uploadFIleAPI()

export default uploadFileService
