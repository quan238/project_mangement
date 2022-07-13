import React from 'react';
import {HeaderUserContent, HeaderUserDropDown, HeaderUserTitle} from './Styles';
import {Tooltip} from "../../../shared/components";
import {Divider} from "../../Sidebar/Styles";
import {useHistory} from "react-router-dom";


const HeaderUser = tooltipProps => {
    const history = useHistory()
    return (
        <Tooltip
            width={300}
            {...tooltipProps}
            renderContent={() =>
                (
                    <HeaderUserDropDown>
                        <HeaderUserTitle>Account</HeaderUserTitle>
                        <HeaderUserContent>Profile</HeaderUserContent>
                        <HeaderUserContent>Personal Setting</HeaderUserContent>
                        <HeaderUserContent>My work</HeaderUserContent>
                        <Divider/>
                        <HeaderUserContent onClick={() => history.push('/login')}>Logout</HeaderUserContent>
                    </HeaderUserDropDown>
                )
            }
        />
    )
};

export default HeaderUser;
