import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from 'shared/components/Button/Styles';
import { Button } from 'shared/components';
import { HeaderStyled, LogoLink, ItemList } from './Styles';
import Logo from './logo.svg';

const propTypes = {
  issueSearchModalOpen: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const ProjectTopHeader = ({ issueSearchModalOpen, issueCreateModalOpen }) => (
  <HeaderStyled className="header">
    <LogoLink to="/">
      <img src={Logo} alt="123" />
    </LogoLink>
    <ItemList>
      <StyledButton className="item" fontSize={16} onClick={issueSearchModalOpen}>
        Your work
      </StyledButton>
      <StyledButton className="item" fontSize={16}>
        Project
      </StyledButton>
      <Button variant="primary" fontSize={16} onClick={issueCreateModalOpen}>
        Create
      </Button>
    </ItemList>
  </HeaderStyled>
);

ProjectTopHeader.propTypes = propTypes;

export default ProjectTopHeader;
