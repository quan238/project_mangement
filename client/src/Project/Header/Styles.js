import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { sizes, color, mixin, zIndexValues, height } from 'shared/utils/styles';
import { Logo } from 'shared/components';

export const HeaderStyled = styled.header`
  z-index: ${zIndexValues.navLeft};
  position: fixed;
  top: 0;
  left: 0;
  height: ${height.header}px;
  width: ${sizes.header};
  background: ${color.backgroundLightHeader};
  transition: all 0.1s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mixin.hardwareAccelerate};
  padding-left: 24px;
  padding-right: 24px;
  &::after {
    content: '';
    position: absolute;
    left: 0px;
    right: 0px;
    top: 100%;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }
`;

export const LogoLink = styled(NavLink)`
  display: flex;
  position: relative;
  left: 0;
  margin: auto 0;
  transition: left 0.1s;
  margin-right: 20px;
`;

export const ItemList = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0px;
  height: 100%;
  position: relative;

  .item {
    padding: 0 6px;
  }

  button {
    margin: 0 8px;

    &:hover {
      background: rgba(222, 235, 255, 0.9);
    }
  }
`;

export const StyledLogo = styled(Logo)`
  display: inline-block;
  margin-left: 8px;
  padding: 10px;
  ${mixin.clickable}
`;
