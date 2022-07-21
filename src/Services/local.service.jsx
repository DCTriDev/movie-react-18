const USER_INFO = process.env.REACT_APP_LOCAL_STORAGE_USER_INFO;

const localServices = {
    setUserInfo: (values) => {
        const userInfo = JSON.stringify(values)
        localStorage.setItem(USER_INFO, userInfo)
    },
    getUserInfo: () => {
        try {
            const userInfoJSON = localStorage.getItem(USER_INFO)
            if (userInfoJSON) {
                return JSON.parse(userInfoJSON)
            }
            else {
                localServices.removeUserInfo()
                return null
            }
        }
        catch (err) {
            //if USER_INFO value has broken, clear it
            localServices.removeUserInfo()
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
