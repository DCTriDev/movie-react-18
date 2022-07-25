import React, {useEffect, useState} from 'react';
import Sidebar from "../../Components/Sidebar/Sidebar";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

function ProfilePage(props) {
    const [isDesktop,setIsDeskTop] = useState(window.innerWidth >= 992);
    const handleResize = () => {
        if(window.innerWidth < 992) {
            setIsDeskTop(false);
        }else {
            setIsDeskTop(true);
        }
    }

    useEffect(() => {
        console.log('isDesktop', isDesktop)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    return (
        <div className='min-h-[100vh] flex'>
            <Sidebar items={items} isDesktop={isDesktop}/>
            <div>
                <h1 className="profile-page text-white">
                    Profile Page
                </h1>
            </div>
        </div>
    );
}

export default ProfilePage;
