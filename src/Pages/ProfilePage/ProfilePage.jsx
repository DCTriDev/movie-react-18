import React, {useLayoutEffect, useState} from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import {ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import GeneralProfile from "./Content/GeneralProfile";

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
    getItem('Transactions', '2', <ShoppingCartOutlined />),
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
        <div className='min-h-[100vh] flex'>
            <Sidebar items={items} isDesktop={isDesktop} defaultSelectedKeys={['1']} setContent={setContentKey}/>
            <div className='pl-2'>
                <div className=''>
                    Header
                </div>
                <div>
                    {handleRenderContent(contentKey)}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
