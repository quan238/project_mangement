import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton} from 'shared/components/Button/Styles';
import {Button} from 'shared/components';
import {HeaderStyled, LogoLink, ItemList} from './Styles';
import Logo from './logo.svg';

const propTypes = {};

// eslint-disable-next-line react/prop-types
const ProjectTopHeader = ({issueSearchModalOpen, issueCreateModalOpen, selectModalOpen, isButton}) => (
    <HeaderStyled className="header">
        <LogoLink to="/">
            <img src={Logo} alt="123"/>
        </LogoLink>
        {isButton ?
            <React.Fragment>
                <ItemList>
                    <StyledButton className="item" fontSize={16} onClick={issueSearchModalOpen}>
                        Your work
                    </StyledButton>
                    <StyledButton className="item" fontSize={16} onClick={selectModalOpen}>
                        Project
                    </StyledButton>
                    <Button variant="primary" fontSize={16} onClick={issueCreateModalOpen}>
                        Create Issues
                    </Button>
                </ItemList>
            </React.Fragment>
            : null}

    </HeaderStyled>
);

ProjectTopHeader.propTypes = propTypes;

export default ProjectTopHeader;
