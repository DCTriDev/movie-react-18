import styled from 'styled-components';
import {Layout} from "antd";

const {Sider} = Layout

const SiderCustom = styled(Sider)`
  .ant-menu {
    background: #000 !important;
    color: #f5f5f5;
  }

  .ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border-right: none !important;
  }
  
  .ant-layout-sider-zero-width-trigger {
    position: absolute;
    top: 64px;
    right: -36px;
    z-index: 1;
    width: 36px;
    height: 42px;
    color: #fff;
    font-size: 18px;
    line-height: 42px;
    text-align: center;
    background: #000;
    border-radius: 0 2px 2px 0;
    cursor: pointer;
    transition: background .3s ease;
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: unset;
  }

  .ant-menu {
    color: #999;
  }

  .ant-menu-item-selected, .ant-menu-item-selected a, .ant-menu-item-selected a:hover {
    color: #f5f5f5;
  }
  .ant-menu-light .ant-menu-item-active, .ant-menu-light .ant-menu-item:hover, .ant-menu-light .ant-menu-submenu-active, .ant-menu-light .ant-menu-submenu-title:hover, .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open {
    color:  #f5f5f5;
  }
`

export default SiderCustom;
