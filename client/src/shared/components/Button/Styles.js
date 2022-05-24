import styled, { css } from 'styled-components';

import { color as Color, font, mixin } from 'shared/utils/styles';
import { space, layout, color, border, typography } from 'styled-system';

import Spinner from 'shared/components/Spinner';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  vertical-align: middle;
  line-height: 1;
  padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  ${mixin.clickable}
  ${font.size(14.5)}
  ${props => buttonVariants[props.variant]}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  ${space}
  ${layout}
  ${color}
  ${border}
  ${typography}
`;

const colored = css`
  color: #fff;
  background: ${props => Color[props.variant]};
  ${font.medium}
  &:not(:disabled) {
    &:hover {
      background: ${props => mixin.lighten(Color[props.variant], 0.15)};
    }
    &:active {
      background: ${props => mixin.darken(Color[props.variant], 0.1)};
    }
    ${props =>
      props.isActive &&
      css`
        background: ${mixin.darken(Color[props.variant], 0.1)} !important;
      `}
  }
`;

const secondaryAndEmptyShared = css`
  color: ${Color.textDark};
  ${font.regular}
  &:not(:disabled) {
    &:hover {
      background: ${Color.backgroundLight};
    }
    &:active {
      color: ${Color.primary};
      background: ${Color.backgroundLightPrimary};
    }
    ${props =>
      props.isActive &&
      css`
        color: ${Color.primary};
        background: ${Color.backgroundLightPrimary} !important;
      `}
  }
`;

const buttonVariants = {
  primary: colored,
  success: colored,
  danger: colored,
  secondary: css`
    background: ${Color.secondary};
    ${secondaryAndEmptyShared};
  `,
  empty: css`
    background: #fff;
    ${secondaryAndEmptyShared};
  `,
};

export const StyledSpinner = styled(Spinner)`
  position: relative;
  top: 1px;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${props => (props.withPadding ? 7 : 0)}px;
`;
