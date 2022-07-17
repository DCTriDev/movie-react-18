import Axios from "./axiosClient";

class UserAPI {
    login = (data, setLoading = true) => {
        const payload = {
            query: `
                mutation{
                    login(input:{
                        username: ${data.username},
                        password: ${data.password},
                    }){
                        username
                        fullName
                        email
                        phoneNumber
                        roleName
                        accessToken
                    }
                }
            `
        }
        return Axios.postMethod(payload, setLoading);
    };

    signup = (data, setLoading = true) => {
        const uri = "/QuanLyNguoiDung/DangKy";
        return Axios.postMethod(uri, data, setLoading);
    };
}

const userService = new UserAPI();

export default userService;
