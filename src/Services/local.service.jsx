const USER_INFO = process.env.REACT_APP_LOCAL_STORAGE_USER_INFO;

const localServices = {
    setUserInfo: (values) => {
        const userInfo = JSON.stringify(values)
        localStorage.setItem(USER_INFO, userInfo)
    },
    getUserInfo: () => {
        const userInfoJSON = localStorage.getItem(USER_INFO)
        if (JSON.parse(userInfoJSON) !== "") {
            return JSON.parse(userInfoJSON)
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
            return userInfo.accessToken
        }
        return null
    },
}

export default localServices
