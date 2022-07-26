import styled from 'styled-components';
import {Menu} from "antd";

const UserMenu = styled(Menu)`
  .UGnHX .ant-dropdown-menu-item, .UGnHX .ant-dropdown-menu-submenu-title {
    margin: -2px !important;
    padding: 4px !important;
  }

  .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {
    background: #000;
    clear: both;
    margin: 3px 0;
    padding: 5px 12px;
    color: #999;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
  }

  .ant-dropdown-menu-item.ant-dropdown-menu-item-active, .ant-dropdown-menu-item.ant-dropdown-menu-submenu-title-active, .ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title.ant-dropdown-menu-item-active, .ant-dropdown-menu-submenu-title.ant-dropdown-menu-submenu-title-active, .ant-dropdown-menu-submenu-title:hover {
    
    border-radius: 10px;
    color: #f5f5f5;
    transition: background-color 0.1s ease-in-out !important;
  }
  
  .ant-dropdown-menu-item.ant-dropdown-menu-item-active, .ant-dropdown-menu-item.ant-dropdown-menu-submenu-title-active, .ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title.ant-dropdown-menu-item-active, .ant-dropdown-menu-submenu-title.ant-dropdown-menu-submenu-title-active, .ant-dropdown-menu-submenu-title:hover{
    background: unset;
    color: #fff;
  }
`

export default UserMenu;
