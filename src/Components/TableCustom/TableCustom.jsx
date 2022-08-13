import styled from 'styled-components'
import {Table} from 'antd'

const TableCustom = styled(Table)`
  .ant-table {
    background: unset;
    color: #dee4e9;
  }

  .ant-table-thead > tr > th {
    color: white;
    background: black;
    border-bottom: 1px solid #444;
  }

  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #444;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: rgb(45, 45, 45);
  }
  
  .ant-tag-green {
    color: rgb(169, 255, 91);
    background-image: initial;
    background-color: rgb(0, 15, 0);
    border-color: rgb(75, 205, 0);
  }

  .ant-tag-red {
    color: rgb(255, 59, 80);
    background-image: initial;
    background-color: rgb(32, 0, 0);
    border-color: rgb(238, 0, 0);
  }

  .ant-pagination-disabled .ant-pagination-item-link, .ant-pagination-disabled:hover .ant-pagination-item-link {
    color: rgba(255, 255, 255, 0.25);
    border-color: rgb(52, 58, 61);
  }

  .ant-pagination-item{
    border-color: rgb(52, 58, 61);
  }
  
  .ant-pagination-item a {
    color: rgba(255, 255, 255, 0.25);
    background: rgb(45, 45, 45);
    border-color: rgb(52,58,61) !important;
  }

  .ant-pagination-item-active a {
    color: rgb(32, 175, 255);
    background: transparent;
  }
  
  .ant-pagination-item-active {
    font-weight: 500;
    background: transparent;
    border-color: #1890ff;
  }

  .ant-pagination-next .ant-pagination-item-link, .ant-pagination-prev .ant-pagination-item-link {
    background-color: unset;
    border-color: rgb(52, 58, 61);
    outline-color: initial;
  }
  .auto-complete-input {
    display: none;
  }

  .ant-table-tbody>tr.ant-table-placeholder:hover>td {
    background: rgb(45, 45, 45);
  }

`

export default TableCustom
