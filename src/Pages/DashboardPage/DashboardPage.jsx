import React, {useLayoutEffect, useState} from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import {PlaySquareOutlined, UserOutlined} from '@ant-design/icons'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Movie', '1', <PlaySquareOutlined />),
    getItem('Actor', '2', <UserOutlined />),
];

function DashboardPage(props) {
    const [isDesktop,setIsDeskTop] = useState(window.innerWidth >= 992);
    const [contentKey, setContentKey] = useState(<div>Movie</div>);
    const handleResize = () => {
        if(window.innerWidth < 992) {
            setIsDeskTop(false);
        }else {
            setIsDeskTop(true);
        }
    }

    const handleRenderContent = (key) => {
        switch (key) {
            case '1': return (<div>Movie</div>);
            case '2': return (<div>Actor</div>);
            default: return (<div>Movie</div>);
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    return (
        <div className='min-h-[100vh] flex w-full'>
            <Sidebar items={items} isDesktop={isDesktop} defaultSelectedKeys={['1']} setContent={setContentKey}/>
            <div className='w-full'>
                <div className='pl-2'>
                    {handleRenderContent(contentKey)}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
