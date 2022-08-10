import styled from 'styled-components'
import {Modal} from 'antd'

const ModalCustom = styled(Modal)`
  .ant-modal-content {
    position: relative;
    background-color: #000;
    background-clip: padding-box;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    pointer-events: auto;
  }

  .ant-modal-header {
    padding: 16px 24px;
    color: #995aff !important;
    background: #000000;
    border-bottom: 1px solid #555555;
    border-radius: 2px 2px 0 0;
  }

  .ant-modal-body {
    padding: 24px;
    font-size: 14px;
    line-height: 1.5715;
    word-wrap: break-word;
    color: #f5f5f5;
  }
  
  .ant-modal-title {
    margin: 0;
    color: #995aff !important;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
  }

  .ant-modal-footer {
    border-top: 1px solid #555555;
  }
`

export default ModalCustom
