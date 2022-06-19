import React, {useEffect} from 'react';
import {List} from "antd";
import {useHistory} from "react-router-dom";

function PopUpSearch(props) {
    const history = useHistory()
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
                renderItem={(item) => (
                    <List.Item
                        className='duration-200 hover:bg-amber-200 ease-in-out cursor-pointer'
                        onClick={() => {
                            history.push(`/movie-details/${item.maPhim}`)
                        }}
                    >
                        {item.tenPhim}
                    </List.Item>
                )}
            />
        </>
    );
}

export default PopUpSearch;

