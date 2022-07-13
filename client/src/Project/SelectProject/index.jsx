import React from 'react';
import PropTypes from 'prop-types';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import {Form, Icon, PageError, PageLoader,} from 'shared/components';

import {
    FormHeading,
    FormElement,
    SelectItem,
    SelectItemLabel,
    Actions,
    ActionButton, FormTip,
} from './Styles';
import {useHistory} from "react-router-dom";

const propTypes = {
    onCreate: PropTypes.func.isRequired,
    modalClose: PropTypes.func.isRequired,
};

const SelectProject = ({selectedProject: projectSelectedData, onCreate, modalClose}) => {
    const [{data, error}] = useApi.get('/project/me');
    const history = useHistory()
    if (!data) return <PageLoader/>;
    if (error) return <PageError/>;

    return (
        <Form
            enableReinitialize
            initialValues={Form.initialValues(projectSelectedData, get => ({
                projectId: get('id'),
            }))}
            validations={{
                projectId: Form.is.required(),
            }}
            onSubmit={async (values, form) => {
                try {
                    const selectedProject = data.find(({id}) => id === values.projectId);
                    toast.success(`You have be select ${selectedProject.name}`);
                    onCreate(values.projectId);
                } catch (error) {
                    Form.handleAPIError(error, form);
                }
            }}
        >
            <FormElement>
                <FormHeading>Select your project</FormHeading>
                <Form.Field.Select
                    name="projectId"
                    label="Project"
                    options={projectOptions(data)}
                    renderOption={renderSelectedProject(data)}
                    renderValue={renderSelectedProject(data)}
                />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <FormTip>Select your project to go to project's dashboard. If you want to create new project, Please
                    <span onClick={() => history.push('/create-project')}> click here</span></FormTip>


                <Actions>
                    <ActionButton type="submit" variant="primary">
                        Go to
                    </ActionButton>
                    <ActionButton type="button" variant="empty" onClick={modalClose}>
                        Cancel
                    </ActionButton>
                </Actions>
            </FormElement>
        </Form>
    );
};


const projectOptions = project => project.map(childProject => ({value: childProject.id, label: childProject.name}));

const renderSelectedProject = project => ({value: projectId, removeOptionValue}) => {
    const selectedProject = project.find(({id}) => id === projectId);

    return (
        <SelectItem
            key={selectedProject.id}
            withBottomMargin={!!removeOptionValue}
            onClick={() => removeOptionValue && removeOptionValue()}
        >
            <SelectItemLabel>{selectedProject.name}</SelectItemLabel>
            {removeOptionValue && <Icon type="close" top={2}/>}
        </SelectItem>
    );
};

SelectProject.propTypes = propTypes;

export default SelectProject;
