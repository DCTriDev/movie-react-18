import React, {useEffect, useState} from 'react';
import {List} from "antd";
import {useHistory} from "react-router-dom";

function PopUpSearch(props) {
    const history = useHistory()
    const [renderAmount, setRenderAmount] = useState(5)
    const {searchResults} = props;
    useEffect(() => {
        const error = document.querySelector('.ant-empty-description');
        if (error) {
            error.innerHTML = 'Không tìm thấy phim';
        }
    }, [searchResults]);

    return (
        <>
            <List
                bordered
                className='absolute z-50 bg-amber-50 rounded-2xl min-w-full overflow-hidden'
                dataSource={searchResults ? searchResults : []}
                renderItem={(item, index) => {
                    if (index < renderAmount) {
                        return (
                            <List.Item
                                className='duration-200 hover:bg-amber-200 ease-in-out cursor-pointer'
                                onClick={() => {
                                    history.push(`/movie-details/${item.maPhim}`)
                                }}
                            >
                                {item.tenPhim}
                            </List.Item>
                        )
                    } else {
                        if(index< renderAmount ) {
                            return (
                                <>
                                    <List.Item
                                        className='duration-200 hover:bg-amber-200 ease-in-out cursor-pointer'
                                        onClick={() => {
                                            history.push(`/movie-details/${item.maPhim}`)
                                        }}
                                    >
                                        {item.tenPhim}
                                    </List.Item>
                                </>
                            )
                        }
                        else {
                            if(index===renderAmount+1) return (
                                <List.Item
                                    className='duration-200 hover:bg-amber-200 ease-in-out cursor-pointer text-center'
                                    onClick={() => {
                                        setRenderAmount(renderAmount + 5)
                                    }}
                                >
                                    Hiển thị thêm
                                </List.Item>
                            )
                        }
                    }
                }}
            />
        </>
    );
}

export default PopUpSearch;

