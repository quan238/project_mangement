import React from 'react';
import PropTypes from 'prop-types';

import {ProjectCategory, ProjectCategoryCopy} from 'shared/constants/projects';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import {Form, Breadcrumbs, Avatar, Icon, PageLoader} from 'shared/components';

import {FormCont, FormHeading, FormElement, ActionButton} from './Styles';
import {SelectItem, SelectItemLabel} from "../IssueCreate/Styles";
import useCurrentUser from "../../shared/hooks/currentUser";

const propTypes = {
    project: PropTypes.object.isRequired,
    fetchProject: PropTypes.func.isRequired,
};

const ProjectSettings = ({project, fetchProject}) => {
    const [{isUpdating}, updateProject] = useApi.put(`/project/${project.id}`);
    const currentUser = useCurrentUser()
    const [{data, error}] = useApi.get(`/users`);
    if (!data || !currentUser) return <PageLoader/>;
    const {users} = data

    return (
        <Form
            initialValues={Form.initialValues(project, get => {
                console.log('get-users', get('users'))
                return ({
                    name: get('name'),
                    url: get('url'),
                    category: get('category'),
                    description: get('description'),
                    users: get('users').map((item) => item.id),
                })
            })}
            validations={{
                name: [Form.is.required(), Form.is.maxLength(100)],
                url: Form.is.url(),
                category: Form.is.required(),
            }}
            onSubmit={async (values, form) => {
                try {
                    await updateProject({
                        ...values,
                        users: [...users.filter((item) => values.users.includes(item.id))]
                    });
                    await fetchProject();
                    toast.success('Changes have been saved successfully.');
                } catch (error) {
                    Form.handleAPIError(error, form);
                }
            }}
        >
            <FormCont>
                <FormElement>
                    <Breadcrumbs items={['Projects', project.name, 'Project Details']}/>
                    <FormHeading>Project Details</FormHeading>

                    <Form.Field.Input name="name" label="Name"/>
                    <Form.Field.Input name="url" label="URL"/>
                    <Form.Field.TextEditor
                        name="description"
                        label="Description"
                        tip="Describe the project in as much detail as you'd like."
                    />
                    <Form.Field.Select
                        isMulti
                        name="users"
                        label="Assignees"
                        tio="People who are responsible for join this project."
                        options={userOptions(users, currentUser.currentUser.id)}
                        renderOption={renderUser(users, currentUser.currentUser.id)}
                        renderValue={renderUser(users, currentUser.currentUser.id)}
                    />
                    <Form.Field.Select name="category" label="Project Category" options={categoryOptions}/>
                    <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
                        Save changes
                    </ActionButton>
                </FormElement>
            </FormCont>
        </Form>
    );
};

const userOptions = (users, removeID) => users.filter(({id}) => id !== removeID).map(user => ({
    value: user.id,
    label: user.name
}));

const renderUser = (users, removeID) => ({value: userId, removeOptionValue}) => {
    const findUser = users.find(({id}) => id === userId)
    if (removeID === findUser.id) {
        return <div/>
    }

    if (!findUser) {

    }

    return (
        <SelectItem
            key={findUser.id}
            withBottomMargin={!!removeOptionValue}
            onClick={() => removeOptionValue && removeOptionValue()}
        >
            <Avatar size={20} avatarUrl={findUser.avatarUrl} name={findUser.name}/>
            <SelectItemLabel>{findUser.name}</SelectItemLabel>
            {removeOptionValue && <Icon type="close" top={2}/>}
        </SelectItem>
    );
};

const categoryOptions = Object.values(ProjectCategory).map(category => ({
    value: category,
    label: ProjectCategoryCopy[category],
}));

ProjectSettings.propTypes = propTypes;

export default ProjectSettings;
