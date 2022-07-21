const USER_INFO = process.env.REACT_APP_LOCAL_STORAGE_USER_INFO;

const localServices = {
    setUserInfo: (values) => {
        let userInfo = JSON.stringify(values)
        localStorage.setItem(USER_INFO, userInfo)
    },
    getUserInfo: () => {
        const userInfo = localStorage.getItem(USER_INFO)
        if (userInfo) {
            return JSON.parse(userInfo)
        }
        else {
            localServices.removeUserInfo()
            return null
        }
    },
    removeUserInfo: () => {
        localStorage.removeItem(USER_INFO)
    },
    getAccessToken() {
        const userInfo = this.getUserInfo()
        if (userInfo) {
            return JSON.parse(userInfo).accessToken
        }
        else return null
    },
}

export default localServices
