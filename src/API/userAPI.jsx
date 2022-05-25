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

    getListMovies = (setLoading = true) => {
        const params = {
            maNhom: this.GROUP_ID
        }
        const uri = '/QuanLyPhim/LayDanhSachPhim';
        return Axios.getMethod(uri, params, setLoading)
    }

    getListCinema = (setLoading = true) => {
        const params = {
            maNhom: this.GROUP_ID
        }
        const uri = '/QuanLyRap/LayThongTinLichChieuHeThongRap';
        return Axios.getMethod(uri, params, setLoading)
    }
}

const userService = new UserAPI();

export default userService;
