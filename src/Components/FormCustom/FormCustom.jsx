import styled from 'styled-components';
import {Form} from "antd";

const FormCustom = styled(Form)`
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    display: none;
  }
  
  .ant-col-24.ant-form-item-label, .ant-col-xl-24.ant-form-item-label, .ant-form-vertical .ant-form-item-label{
    padding: 0;
  }

  .ant-form-item{
    margin: 0 0 12px;
  }
  
  .ant-btn{
    height: auto;
  }
`

export default FormCustom;
