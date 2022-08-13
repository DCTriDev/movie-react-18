import React, {useLayoutEffect, useState} from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import {IdcardOutlined, PlaySquareOutlined, UserOutlined} from '@ant-design/icons'
import UserManagement from './UserManagement/UserManagement'
import MovieManagement from './MovieManagement/MovieManagement'
import ActorManagement from './ActorManagement/ActorManagement'
import UserNav from '../../Components/Navbar/UserNav/UserNav'

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
    getItem('Actor', '2', <IdcardOutlined />),
    getItem('User', '3', <UserOutlined />),
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
            case '1': return (<MovieManagement/>);
            case '2': return (<ActorManagement/>);
            case '3': return (<UserManagement />);
            default: return (<MovieManagement/>);
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
            <div className='w-full relative'>
                    <div className='absolute right-16 top-2'>
                        <UserNav />
                    </div>
                <div className='px-2'>
                    {handleRenderContent(contentKey)}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
