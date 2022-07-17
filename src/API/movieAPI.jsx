import AxiosService from "./axiosClient";
import localService from "../Services/local.service";

class MovieAPI {
    GROUP_ID = localService.getGroupID() ? localService.getGroupID() : 'GP01';

    getListBanner = (setLoading = true) => {
        const uri ='/QuanLyPhim/LayDanhSachBanner'
        return AxiosService.getMethod(uri, null, setLoading)
    }

    getListMovies = (setLoading = true) => {
        const params = {
            maNhom: this.GROUP_ID
        }
        const uri = '/QuanLyPhim/LayDanhSachPhim';
        return AxiosService.getMethod(uri, params, setLoading)
    }

    getListCinema = (setLoading = true) => {
        const params = {
            maNhom: this.GROUP_ID
        }
        const uri = '/QuanLyRap/LayThongTinLichChieuHeThongRap';
        return AxiosService.getMethod(uri, params, setLoading)
    }

    getMovieDetail = (maPhim, setLoading = true) => {
        const params = {
            MaPhim: maPhim
        }
        const uri = '/QuanLyPhim/LayThongTinPhim'
        return AxiosService.getMethod(uri, params, setLoading)
    }
}

const movieService = new MovieAPI();

export default movieService;
