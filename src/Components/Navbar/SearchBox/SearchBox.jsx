import React, {useEffect, useState} from 'react';
import {Input, Select} from "antd";
import {useHistory} from "react-router-dom";

const {Search} = Input;
const {Option} = Select;


function SearchBox() {
    let [searchTerm, setSearchTerm] = useState('')
    let [result, setResult] = useState([{id: 1, name: 'Tên sản phẩm'}])
    const history = useHistory()
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(searchTerm)
            // Send Axios request here
        }, 400)

        // const delayDebounce = () => {
        //     setTimeout(() => {
        //         console.log(searchTerm)
        //         // Send Axios request here
        //     }, 400)
        // }

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const danhSachPhim = [
        {
            "maPhim": 8708,
            "tenPhim": "RỪNG THẾ MẠNGGG",
            "biDanh": "rung-the-manggg",
            "trailer": "https://www.youtube.com/embed/Vm3t0goJOGg",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/rung-the-mang_gp01.jpg",
            "moTa": "Phim được thực hiện dựa trên các sự kiện có thật xảy ra tại một trong những cung đường trekking nổi tiếng nhất nước ta: Tà Năng - Phan Dũng. Đây cũng là tác phẩm đầu tiên của điện ảnh Việt Nam làm về chủ đề sinh tồn.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-06-07T23:40:47.647",
            "danhGia": 6,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 8709,
            "tenPhim": "MA TRẬN: HỒI SINH",
            "biDanh": "ma-tran-hoi-sinh",
            "trailer": "https://www.youtube.com/embed/AT0VjEfeSik",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ma-tran-hoi-sinh_gp01.jpg",
            "moTa": "Ma Trận: Hồi Sinh - The Matrix Resurrections 2021 Quay Trở Lại Một Thế Giới Của Hai Thực Tại: Một, Cuộc Sống Hàng Ngày; Khác, Những Gì Nằm Sau Nó. Để Tìm Hiểu Xem Thực Tế Của Anh Ta Có Phải Là Một Công Trình Hay Không, để Thực Sự Hiểu Rõ Bản Thân Mình, Anh Anderson Sẽ Phải Chọn Theo Dõi Con Thỏ Trắng Một Lần Nữa. Ma Trận: Hồi Sinh là phần phim tiếp theo rất được trông đợi của loạt phim “Ma Trận” đình đám, đã góp phần tái định nghĩa thể loại phim khoa học viễn tưởng. Phần phim mới nhất này đón chào sự trở lại của cặp đôi Keanu Reeves và Carrie-Anne Moss với vai diễn biểu tượng đã làm nên tên tuổi của họ, Neo và Trinity. Ngoài ra, phim còn có sự góp mặt của dàn diễn viên đầy tài năng gồm Yahya Abdul-Mateen II, Jessica Henwick, Jonathan Groff, Neil Patrick Harris, Priyanka Chopra Jonas và Christina Ricci.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-09T15:49:10.787",
            "danhGia": 7,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 8798,
            "tenPhim": "Cậu Ấy Không Phải Tôi - Not Me (2021))",
            "biDanh": "cau-ay-khong-phai-toi-not-me-2021-",
            "trailer": "https://www.youtube.com/watch?v=Q91hKXjq_3s",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/cau-ay-khong-phai-toi-not-me-2021-_gp01.jpg",
            "moTa": "Cậu Ấy Không Phải Tôi - Not Me (2021) là bộ phim truyền hình Thái Lan, do đạo diễn Nuchie Anucha Boonyawatana cầm trịch sản xuất. Phim xoay quanh cặp đôi Đen và Trắng là cặp song sinh có mối liên hệ mạnh mẽ và hành trình tìm ra sự thật để báo thù về cái chết của người anh em còn lại của mình.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-23T20:05:12.163",
            "danhGia": 8,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 8807,
            "tenPhim": "The Mitchells vs. the Machine",
            "biDanh": "the-mitchells-vs-the-machine",
            "trailer": "https://www.youtube.com/watch?v=ra8dwFFcumU",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-mitchells-vs-the-machines_gp01.jpg",
            "moTa": "Nhà Mitchell đối đầu với máy móc là một bộ phim phiêu lưu hoạt hình máy tính của Mỹ năm 2021 do Sony Pictures Animation sản xuất và được phân phối bởi Netflix",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-23T19:49:41.457",
            "danhGia": 10,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 8843,
            "tenPhim": "The Batman 1",
            "biDanh": "the-batman-1",
            "trailer": "https://youtu.be/a8oWMQzXYWA",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-batman_gp01.jpg",
            "moTa": "Do Matt Reeves làm đạo diễn, đây được dự đoán là phần phim đen tối chưa từng có về Người Dơi.  Tay giết người hàng loạt – The Ridder (Paul Dano) sẽ là kẻ thù nguy hiểm hàng đầu của Batman ở phần phim sắp tới. Tên xấu xa này bị cảnh sát James Gordon và đồng đội bắt giữ đã lâu. Thế nhưng, hóa ra việc nhốt gã sau song sắt chỉ khiến The Ridder phiền phức hơn với Đấng. Penguin (Colin Farrell) thể hiện là kẻ thủ ác thích trực tiếp tạo ra hỗn loạn, muốn đối đầu Batman hơn là chỉ đạo gián tiếp theo cách The Ridder thực hiện. Đặc biệt, phần này sẽ tập trung khá nhiều vào mối quan hệ của Batman và Catwoman (Zoë Kravitz). Nàng Mèo xuất hiện rất nhiều trong trailer. giữa cô và Batman dường như có sự đồng cảm sâu sắc.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-23T19:14:56.4",
            "danhGia": 8,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 8844,
            "tenPhim": "'The Lost City",
            "biDanh": "-the-lost-city",
            "trailer": "https://youtu.be/HO7Yai1xKj4",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/-the-lost-city_gp01.jpg",
            "moTa": "Loretta Sage là nhà văn chỉ thích cả ngày quanh quẩn trong nhà. Với trí tưởng tượng phong phú cùng khả năng viết lách như “thần”, tiểu thuyết phiêu lưu kỳ bí mới nhất The Lost City of D của cô đã ra mắt thành công. Vì vậy, nhà xuất bản thuyết phục Loretta tham gia tuyên truyền cho cuốn sách. Sự kiện “định mệnh” này đã đánh dấu cuộc gặp mặt oái ăm giữa cô và chàng người mẫu chụp ảnh trang bìa. Alan đẹp trai lãng tử nhưng hơi nhập vai “quá đà” khiến Loretta không thể nào chấp nhận việc anh ta đại diện cho người hùng Dash mà chính tay cô “nhào nặn” nên. Cũng trong sự kiện này, Loretta được mời đến gặp mặt một nhân vật bí ẩn và vô cùng giàu có. Hắn bày tỏ lòng yêu thích với tác phẩm rồi “bắt cóc” cô tới hoang đảo để tìm kiếm kho báu. Biết tin Loretta mất tích, “máu” anh hùng của Alan nổi lên, chạy đi giải cứu cô. Thế nhưng, kĩ năng sinh tồn bằng 0 khiến họ lâm vào những hoàn cảnh “khó đỡ”, từ chạy trốn khỏi súng đạn của kẻ ác đến trèo đèo lội suối tìm cách sống sót giữa rừng rậm. Thế nhưng, trong cái rủi có cái may, ngay lúc bộ đôi đang vật lộn tìm cách tẩu thoát, họ thực sự tìm ra manh mối về thành phố đã mất - nơi mà tên tỷ phú đang không ngừng lùng sục…",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-23T18:42:38.26",
            "danhGia": 8,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 8849,
            "tenPhim": "Công tố viên chuyển sinh 1",
            "biDanh": "cong-to-vien-chuyen-sinh-1",
            "trailer": "youtube.com/watch?v=H8qti-dUUmU",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/cong-to-vien-chuyen-sinh_gp01.jpg",
            "moTa": "Công tố viên chuyển sinh",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-23T18:39:14.173",
            "danhGia": 9,
            "hot": false,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 8901,
            "tenPhim": "NGHỀ SIÊU DỄ  11",
            "biDanh": "nghe-sieu-de-11",
            "trailer": "https://youtu.be/AlYDgL3S95Y",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/nghe-sieu-de_gp01.jpg",
            "moTa": "Ông Thái là cảnh sát về hưu nhưng vẫn nhớ nghề, hàng ngày thường tìm bắt tội phạm vặt trong xóm. Một ngày kia, Hoàng - tên trùm ma túy mới ra tù bỗng dưng chuyển đến xóm ông và mở một văn phòng bất động sản. Nghi ngờ đây là nơi làm ăn phi pháp, ông Thái quyết định âm thầm điều tra. Xem thêm tại: https://www.galaxycine.vn/dat-ve/nghe-sieu-de  Xem thêm tại: https://www.galaxycine.vn/dat-ve/nghe-sieu-de",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-23T19:10:12.357",
            "danhGia": 7,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 8902,
            "tenPhim": "DOCTOR STRANGE IN THE MULTIVERSE OF MADNESS ",
            "biDanh": "doctor-strange-in-the-multiverse-of-madness",
            "trailer": "https://www.youtube.com/embed/Rf8LAYJSOL8",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/doctor-strange-in-the-multiverse-of-madness_gp01.jpg",
            "moTa": "Trailer mới Doctor Strange In The Multiverse Of Madness hé lộ một nhân vật bí ẩn dường như là giáo sư X phiên bản già Patrick Stewart. Cả giáo sư X phiên bản trẻ (James McAvoy) và Jean Grey (Sophie Turner) đều có tin xuất hiện ở phim trường Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn. Đặc biệt nhất là lời đồn không tưởng về việc Tom Cruise sẽ trở thành Iron Man mới đang lan truyền rộng rãi.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-06T00:00:00",
            "danhGia": 10,
            "hot": false,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 8909,
            "tenPhim": "JURASSIC WORLD DOMINION  ",
            "biDanh": "jurassic-world-dominion",
            "trailer": "https://www.youtube.com/embed/3y0KM5jUnmk",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/jurassic-world-dominion_gp01.jpg",
            "moTa": "Bốn năm sau kết thúc Jurassic World: Fallen Kingdom, những con khủng long đã thoát khỏi nơi giam cầm và tiến vào thế giới loài người. Giờ đây, chúng xuất hiện ở khắp mọi nơi. Sinh vật to lớn ấy không còn chỉ ở trên đảo như trước nữa mà gần ngay trước mắt, thậm chí còn có thể chạm tới ",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-10T00:00:00",
            "danhGia": 8,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 9001,
            "tenPhim": "PHI CÔNG SIÊU ĐẲNG MAVERICK  ",
            "biDanh": "phi-cong-sieu-dang-maverick",
            "trailer": "https://www.youtube.com/embed/ZR99nOkEolM",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/phi-cong-sieu-dang-maverick_gp01.jpg",
            "moTa": "Pete “Maverick” Mitchell từng nổi danh là một phi công thử nghiệm quả cảm hàng đầu của Hải quân. Sau hơn ba mươi năm phục vụ, anh né tránh cơ hội thăng chức khiến bản thân cảm thấy bị bó buộc, để trở về làm chính mình - một đại úy. Trong đợt đào tạo biệt đội tại trường quân sự Top Gun cho nhiệm vụ chuyên biệt chưa từng có, Maverick chạm trán với Trung úy Bradley Bradshaw (Miles Teller) - con trai của người bạn thân quá cố Nick Bradshaw.   Với nhiệm vụ lần này, không chỉ đối mặt với những thử thách nguy hiểm đến tính mạng, Pete Mitchell còn đối mặt với bóng ma quá khứ, nỗi sợ hãi sâu thẳm trong thâm tâm. Xem thêm tại: https://www.galaxycine.vn/dat-ve/top-gun-maverick  Xem thêm tại: https://www.galaxycine.vn/dat-ve/top-gun-maverick",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-09T00:00:00",
            "danhGia": 8,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 9055,
            "tenPhim": "Digimon",
            "biDanh": "digimon",
            "trailer": "https://www.youtube.com/watch?v=LYqPCDhadY0",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/digimon_gp01.jpg",
            "moTa": "Với sức mạnh thức tỉnh từ Trái Ác Quỷ Zoan Thần Thoại Nika, Luffy đấm Kaido không trượt phát nào! Ai đó cứu Kaido nhanh lên chứ không Luffy sẽ chiến thắng trong vài chap nữa thôi!",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-14T00:00:00",
            "danhGia": 9,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 9056,
            "tenPhim": "The Haunting of Hill House",
            "biDanh": "the-haunting-of-hill-house",
            "trailer": "https://www.youtube.com/watch?v=LYqPCDhadY0",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-haunting-of-hill-house_gp01.jpg",
            "moTa": "Với sức mạnh thức tỉnh từ Trái Ác Quỷ Zoan Thần Thoại Nika, Luffy đấm Kaido không trượt phát nào! Ai đó cứu Kaido nhanh lên chứ không Luffy sẽ chiến thắng trong vài chap nữa thôi!",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-05-05T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 9058,
            "tenPhim": "New Avenger",
            "biDanh": "new-avenger",
            "trailer": "https://www.youtube.com/watch?v=m5iorRRNqH4",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/new-avenger_gp01.jpg",
            "moTa": "Biệt đội siêu anh hùng là một phim siêu anh hùng của Hoa Kỳ được xây dựng dựa trên nguyên mẫu các thành viên của biệt đội siêu anh hùng Avengers của Marvel Comics, sản xuất bởi Marvel Studios và phân phối bởi Walt Disney Studios Motion Pictures. Đây là bộ phim thứ 6 trong Vũ trụ Điện ảnh Marvel (MCU).",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-07-16T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 9083,
            "tenPhim": "Thor: Love and Thunder",
            "biDanh": "thor-love-and-thunder",
            "trailer": "https://www.youtube.com/watch?v=Go8nTmfrQd8&ab_channel=MarvelEntertainment",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thor-love-and-thunder_gp01.jpg",
            "moTa": "Thor embarks on a journey unlike anything he's ever faced -- a quest for inner peace. However, his retirement gets interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods.",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-06-10T00:00:00",
            "danhGia": 5,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        },
        {
            "maPhim": 9117,
            "tenPhim": "thêm phim 1",
            "biDanh": "them-phim-1",
            "trailer": "thêm phim 1",
            "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/them-phim-1_gp01.jpg",
            "moTa": "thêm phim 1",
            "maNhom": "GP01",
            "ngayKhoiChieu": "2022-06-07T00:00:00",
            "danhGia": 1,
            "hot": true,
            "dangChieu": true,
            "sapChieu": true
        }
    ]

    function search() {
        setResult([{id: 1, name: "phim 1"}, {id: 2, name: "phim 2"}, {id: 3, name: "phim 3"}, {
            id: 4,
            name: "phim 4"
        }, {id: 5, name: "phim 5"}])
        console.log("search");
        //rồi h muốn ấn search nó đổi thì sao
    }

    return (
        <>
            {/*<input type="text" placeholder={'search'}/>*/}
            {/*<button type={'button'} onClick={search}>Search</button>*/}
            {/*<div>*/}
            {/*    <ul>*/}
            {/*        {result.map((phim, index) => {*/}
            {/*            return (*/}
            {/*                <li key={index}>{phim.name}</li>*/}
            {/*            )*/}
            {/*        })}*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <Search
                placeholder='Tìm kiếm phim'
            >

            </Search>
            {/*<SearchCustom*/}
            {/*    showSearch*/}
            {/*    style={{width: 200}}*/}
            {/*    placeholder="Tìm kiếm"*/}
            {/*    optionFilterProp="children"*/}
            {/*    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
            {/*    }*/}
            {/*    // onChange={(value) => {*/}
            {/*    //     console.log(value)*/}
            {/*    // }}*/}
            {/*>*/}
            {/*    {danhSachPhim.map((movie, key) => (*/}
            {/*        <Option key={key}*/}
            {/*                value={movie.maPhim}*/}
            {/*        >*/}
            {/*            {movie.tenPhim}*/}
            {/*        </Option>*/}
            {/*    ))}*/}
            {/*</SearchCustom>*/}
        </>
    );
}

export default SearchBox;
