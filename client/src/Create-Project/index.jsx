import React from 'react';
import toast from 'shared/utils/toast';
import {Form} from 'shared/components';
import {FormHeading, FormElement, ActionButton, CreateProjectComponent} from './Styles';
import {Actions, Divider} from "../Project/IssueCreate/Styles";
import Header from "../Project/Header";
import {ProjectCategory, ProjectCategoryCopy} from "../shared/constants/projects";
import useApi from "../shared/hooks/api";

const propTypes = {};

const CreateProject = () => {
    const [{isCreating}, createProject] = useApi.post('/project');


    return (
        <CreateProjectComponent>
            <Header
                isButton={false}
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
                        });
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
                    <Actions>
                        <ActionButton type="submit" variant="primary">
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

const categoryOptions = Object.values(ProjectCategory).map(category => ({
    value: category,
    label: ProjectCategoryCopy[category],
}));

CreateProject.propTypes = propTypes;

export default CreateProject;
