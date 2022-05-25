const USER_INFO = process.env.REACT_APP_LOCALSTORAGE_USER_INFO;

const localServices = {
    setUserInfo: (values) => {
        let userInfo = JSON.stringify(values)
        localStorage.setItem(USER_INFO, userInfo)
    },
    getUserInfo: () => {
        if (localStorage.getItem(USER_INFO)){
            return JSON.parse(localStorage.getItem(USER_INFO))
        }
        else return null
    },
    removeUserInfo: () => {
        localStorage.setItem(USER_INFO, '')
    },
    getAccessToken() {
        if (this.getUserInfo()){
            return this.getUserInfo().accessToken
        }
        else return null
    },
    getGroupID() {
        if (this.getUserInfo()){
            return this.getUserInfo().maNhom
        }
        else return null
    }
}

export default localServices
