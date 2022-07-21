import {message} from 'antd'

const ApiErrorService = {
    handleError: (error) => {
        const firstError = error[0]
        switch (firstError.status) {
            case 404:{
                message.error(firstError.message, 3)
                break
            }
            default: break
        }
    }
}

export default ApiErrorService
