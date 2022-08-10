import React, {useEffect, useState} from 'react';
import SiderCustom from '../SiderCustom/SiderCustom'
import {Menu} from 'antd'
import {SwapOutlined} from "@ant-design/icons";
import logo from '../../Assets/Images/logo.png';

function Sidebar({items, isDesktop, defaultSelectedKeys, setContent}) {
    const [collapsed, setCollapsed] = useState(!isDesktop);
    const [style, setStyle] = useState({
        position: "absolute",
    })

    const handleSetPosition = () => {
        isDesktop ? setStyle({position: "unset"}) : setStyle({position: "fixed"})
    }

    const handleCollapsed = () => {
        !isDesktop&&setCollapsed(!collapsed);
    }

    useEffect(() => {
        handleSetPosition()
        isDesktop&&setCollapsed(false)
    }, [isDesktop])

    return (
        <SiderCustom
            className='bg-black min-h-[100vh] z-50'
            breakpoint='lg'
            collapsedWidth='0'
            trigger={<SwapOutlined/>}
            style={style}
            collapsed={collapsed}
            onCollapse={handleCollapsed}
        >
            <a href="/" className='cursor-pointer w-full flex justify-center'>
                <img src={logo} alt="logo" className='h-20'/>
            </a>
            <Menu items={items}
                  defaultSelectedKeys={defaultSelectedKeys}
                  onClick={(item) => {
                      setContent(item.key)
                      handleCollapsed()
                  }}
            />
        </SiderCustom>
    );
}

export default Sidebar;
