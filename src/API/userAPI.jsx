import Axios from "./axiosClient";
import localService from "../Services/local.service";

class UserAPI {
    GROUP_ID = localService.getGroupID() ? localService.getGroupID() : 'GP01';

    constructor() {
    }

    login = (data, setLoading = true) => {
        const uri = "/QuanLyNguoiDung/DangNhap";
        return Axios.postMethod(uri, data, setLoading);
    };

    signup = (data, setLoading = true) => {
        const uri = "/QuanLyNguoiDung/DangKy";
        return Axios.postMethod(uri, data, setLoading);
    };
}

const userService = new UserAPI();

export default userService;
