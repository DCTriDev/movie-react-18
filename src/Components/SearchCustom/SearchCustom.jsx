import React from 'react';
import {Select} from "antd";
import styled from "styled-components";

export const SearchCustom = styled(Select)`
  .ant-select-arrow {
    display: none;
  }

  .ant-select-selector{
    border-radius: 1.5rem !important;
    padding: 0.5rem 1rem !important;
    height: auto !important;
  }

  .ant-select-selection-search{
    padding: 0.5rem !important;
  }
`
