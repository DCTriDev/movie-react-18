import React, {useLayoutEffect, useState} from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import {UserOutlined} from "@ant-design/icons";
import GeneralProfile from "./GeneralProfile/GeneralProfile";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Footer from '../../Components/Footer/Footer'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('General', '1', <UserOutlined />),
    // getItem('Transactions', '2', <ShoppingCartOutlined />),
];

function ProfilePage(props) {
    const [isDesktop,setIsDeskTop] = useState(window.innerWidth >= 992);
    const [contentKey, setContentKey] = useState(<div>General</div>);
    const handleResize = () => {
        if(window.innerWidth < 992) {
            setIsDeskTop(false);
        }else {
            setIsDeskTop(true);
        }
    }

    const handleRenderContent = (key) => {
        switch (key) {
            case '1': return (<GeneralProfile/>);
            case '2': return (<div>Transactions</div>);
            default: return (<GeneralProfile/>);
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
                <ProfileHeader/>
                <div className='lg:pl-2 min-h-screen mb-2'>
                    {handleRenderContent(contentKey)}
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default ProfilePage;
