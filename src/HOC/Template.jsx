import React from 'react';
import {Button, Drawer, Space} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {closeDrawPopup, openDrawPopup, setDrawPopupContent} from "../Redux/Slice/drawPopupSlice";

function Template({Component}) {
    let {visible, componentContent} = useSelector(state => state.drawPopupSlice);
    const dispatch = useDispatch()
    console.log(visible);

    const showDrawer = () => {
        dispatch(openDrawPopup())
        dispatch(setDrawPopupContent(Component))
    };

    const onClose = () => {
        dispatch(closeDrawPopup())
    };

    return (
        <>
            <Button type='primary' onClick={showDrawer}>
                New account
            </Button>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{paddingBottom: 80}}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onClose} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {componentContent}
            </Drawer>
        </>
    );
}

export default Template;
