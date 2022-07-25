import React, {useEffect, useState} from 'react';
import SiderCustom from '../SiderCustom/SiderCustom'
import {Menu} from 'antd'
import {SwapOutlined} from "@ant-design/icons";

function Sidebar({items, isDesktop}) {
    const [style, setStyle] = useState({
        position: "absolute",
    })

    const handleSetPosition = () => {
        isDesktop ? setStyle({position: "unset"}) : setStyle({position: "fixed"})
    }
    useEffect(() => {
        handleSetPosition()
    }, [isDesktop])
    return (
        <SiderCustom
            className='bg-black min-h-[100vh]'
            breakpoint='lg'
            collapsedWidth='0'
            trigger={<SwapOutlined/>}
            style={style}
        >
            <Menu items={items}/>
        </SiderCustom>
    );
}

export default Sidebar;
