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
`

export default SiderCustom;
