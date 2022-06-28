import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Tabs} from 'antd';
import {setListCinemaAction} from "../../../Redux/Slice/movieSlice";
import ItemMovieTabs from "./ItemMovieTabs";
import './ListCinemaTabs.css';

const {TabPane} = Tabs;

function callback(key) {
    // console.log(key);
}

function ListCinemaTabs() {
    const dispatch = useDispatch()
    let listCinema = useSelector(state => state.movieSlice.listCinema)

    useEffect(() => {
        dispatch(setListCinemaAction())
    }, [])
    return (
        listCinema ? <div className='px-20 my-12 scroll-custom'>
            <Tabs style={{height: '70vh'}} tabBarGutter={0} defaultActiveKey="1" onChange={callback} tabPosition='left'>
                {
                    listCinema?.map((listCinema, index) => {
                        return (
                            <TabPane tab={<div>{<img className='h-14' src={listCinema.logo} alt=""/>}</div>}
                                     key={index}>
                                <Tabs style={{height: '70vh'}} defaultActiveKey="0" tabPosition='left'>
                                    {
                                        listCinema.lstCumRap.map((cinema, index) => {
                                            return (
                                                <TabPane style={{height:'70vh'}} tab={
                                                    <div className='w-52 whitespace-normal text-left'>
                                                        <h4 className='text-red-600'>{cinema.tenCumRap}</h4>
                                                        <p>{cinema.diaChi}</p>
                                                    </div>
                                                } key={index}>
                                                    <ItemMovieTabs data={cinema}/>
                                                </TabPane>
                                            )
                                        })
                                    }
                                </Tabs>
                            </TabPane>
                        )
                    })
                }
            </Tabs>
        </div> : <></>
    );
}

export default ListCinemaTabs;
