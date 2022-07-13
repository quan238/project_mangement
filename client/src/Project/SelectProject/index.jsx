import React from 'react';
import PropTypes from 'prop-types';

import {
    IssueType,
    IssueStatus,
    IssuePriority,
} from 'shared/constants/issues';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import useCurrentUser from 'shared/hooks/currentUser';
import {Form, Icon, Avatar} from 'shared/components';

import {
    FormHeading,
    FormElement,
    SelectItem,
    SelectItemLabel,
    Actions,
    ActionButton,
} from './Styles';

const propTypes = {
    project: PropTypes.object.isRequired,
    fetchProject: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    modalClose: PropTypes.func.isRequired,
};

const SelectProject = ({project, fetchProject, onCreate, modalClose}) => {
    const [{isCreating}, createIssue] = useApi.post('/issues');

    const {currentUserId} = useCurrentUser();

    return (
        <Form
            enableReinitialize
            initialValues={{
                type: IssueType.TASK,
                title: '',
                description: '',
                reporterId: currentUserId,
                userIds: [],
                priority: IssuePriority.MEDIUM,
            }}
            validations={{
                type: Form.is.required(),
                title: [Form.is.required(), Form.is.maxLength(200)],
                reporterId: Form.is.required(),
                priority: Form.is.required(),
            }}
            onSubmit={async (values, form) => {
                try {
                    await createIssue({
                        ...values,
                        status: IssueStatus.BACKLOG,
                        projectId: project.id,
                        users: values.userIds.map(id => ({id})),
                    });
                    await fetchProject();
                    toast.success('Issue has been successfully created.');
                    onCreate();
                } catch (error) {
                    Form.handleAPIError(error, form);
                }
            }}
        >
            <FormElement>
                <FormHeading>Select your project</FormHeading>
                <Form.Field.Select
                    isMulti
                    name="userIds"
                    label="Project"
                    tio="People who are responsible for dealing with this issue."
                    options={userOptions(project)}
                    renderOption={renderUser(project)}
                    renderValue={renderUser(project)}
                />

                <Actions>
                    <ActionButton type="submit" variant="primary" isWorking={isCreating}>
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


const userOptions = project => project.users.map(user => ({value: user.id, label: user.name}));


const renderUser = project => ({value: userId, removeOptionValue}) => {
    const user = project.users.find(({id}) => id === userId);

    return (
        <SelectItem
            key={user.id}
            withBottomMargin={!!removeOptionValue}
            onClick={() => removeOptionValue && removeOptionValue()}
        >
            <Avatar size={20} avatarUrl={user.avatarUrl} name={user.name}/>
            <SelectItemLabel>{user.name}</SelectItemLabel>
            {removeOptionValue && <Icon type="close" top={2}/>}
        </SelectItem>
    );
};

SelectProject.propTypes = propTypes;

export default SelectProject;
