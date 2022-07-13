import styled from 'styled-components';

import {font} from 'shared/utils/styles';

export const HeaderUserDropDown = styled.div`
  padding: 16px 24px 24px;
`;


export const HeaderUserTitle = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.45455;
  text-transform: uppercase;
  text-align: left;
`;


export const HeaderUserContent = styled.p`
  font-size: 15px;
  margin-bottom: 5px;
  background-color: transparent;
  outline: none;
  overflow: hidden;
  text-align: left;
  padding: 10px 5px;
  cursor: pointer;

  &:hover {
    background-color: #ebecf0;
    opacity: 0.7;
  }
`;
