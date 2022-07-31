import React from 'react';
import toast from 'shared/utils/toast';
import {Avatar, Form, Icon, PageError, PageLoader} from 'shared/components';
import {useHistory} from "react-router-dom";
import {FormHeading, FormElement, ActionButton, CreateProjectComponent} from './Styles';
import {Actions, Divider, SelectItem, SelectItemLabel} from "../Project/IssueCreate/Styles";
import Header from "../Project/Header";
import {ProjectCategory, ProjectCategoryCopy} from "../shared/constants/projects";
import useApi from "../shared/hooks/api";
import useCurrentUser from "../shared/hooks/currentUser";
import {removeProjectSelected} from "../Project";

const propTypes = {};

const CreateProject = () => {
    const [{isCreating}, createProject] = useApi.post('/project');
    const currentUser = useCurrentUser()
    const history = useHistory();
    const [{data, error}] = useApi.get(`/users`);


    if (!data || !currentUser) return <PageLoader/>;
    if (error) return <PageError/>;

    const {users} = data
    return (
        <CreateProjectComponent>
            <Header
                isButton={false}
                user={currentUser.currentUser}
            />
            <Form
                enableReinitialize
                initialValues={
                    {
                        name: '',
                        url: '',
                        description: '',
                        category: '',
                    }
                }
                validations={{
                    name: [Form.is.required(), Form.is.maxLength(100)],
                    url: Form.is.url(),
                    category: Form.is.required(),
                }}
                onSubmit={async (values, form) => {
                    try {
                        await createProject({
                            ...values,
                            users: [...users.filter((item) => values.users.includes(item.id)), currentUser.currentUser]
                        });
                        removeProjectSelected()

                        history.replace('/project')
                        toast.success('Create project have been successfully.');
                    } catch (error) {
                        Form.handleAPIError(error, form);
                    }
                }}
            >
                <FormElement>
                    <FormHeading>Create new Project</FormHeading>
                    <Form.Field.Input
                        name="name"
                        label="Name"
                    />
                    <Form.Field.Input
                        name="url"
                        label="URL"
                        tip="Link to redirect to your project"
                    />
                    <Divider/>
                    <Form.Field.TextEditor
                        name="description"
                        label="Description"
                        tip="Describe the project in as much detail as you'd like."
                    />
                    <Form.Field.Select
                        name="category"
                        label="Project Category"
                        options={categoryOptions}
                    />
                    <Form.Field.Select
                        isMulti
                        name="users"
                        label="Assignees"
                        tio="People who are responsible for join this project."
                        options={userOptions(users, currentUser.currentUser.id)}
                        renderOption={renderUser(users, currentUser.currentUser.id)}
                        renderValue={renderUser(users)}
                    />
                    <Actions>
                        <ActionButton type="submit" variant="primary" isWorking={isCreating}>
                            Create Project
                        </ActionButton>
                        <ActionButton type="button" variant="empty">
                            Cancel
                        </ActionButton>
                    </Actions>
                </FormElement>
            </Form>
        </CreateProjectComponent>
    );
};

const userOptions = (users, removeID) => users.filter(({id}) => id !== removeID).map(user => ({
    value: user.id,
    label: user.name
}));
const renderUser = (users, removeID) => ({value: userId, removeOptionValue}) => {
    if (userId === removeID) {
        return <div/>
    }
    const user = users.filter(({id}) => id !== removeID)
    const findUser = user.find(({id}) => id === userId)

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

CreateProject.propTypes = propTypes;

export default CreateProject;
