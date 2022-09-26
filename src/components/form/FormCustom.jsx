import styled from 'styled-components'
import { Form } from 'antd'

const FormCustom = styled(Form)`
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    display: none;
  }

  .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label, .ant-form-vertical .ant-form-item-label {
    padding: 0;
  }

  .ant-form-item {
    margin: 0 0 12px;
  }

  .ant-btn {
    height: auto;
  }

  .ant-form-item-label > label {
    color: #dee4e9;
  }

  input#deposit_username.ant-input.ant-input-status-success {
    background: black !important;
  }

  .ant-input-affix-wrapper {
    color: #dee4e9;
    background-color: rgb(51, 51, 51);
    border: none !important;
    border-radius: 4px;
  }

  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover {
    border: none !important;
  }

  .ant-input {
    border: none !important;
    color: #dee4e9;
    background-color: rgb(51, 51, 51) !important;
  }

  .ant-input:focus {
    border: none !important;
  }

  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper, .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    background: rgb(51, 51, 51) !important;
  }

  .ant-input-password-icon.anticon {
    color: #dee4e9;
  }

`

export default FormCustom
