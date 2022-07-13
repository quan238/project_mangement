import React, {Fragment} from 'react';
import {Route, Redirect, useRouteMatch, useHistory} from 'react-router-dom';

import useApi from 'shared/hooks/api';
import {updateArrayItemById} from 'shared/utils/javascript';
import {createQueryParamModalHelpers} from 'shared/utils/queryParamModal';
import {PageLoader, PageError, Modal} from 'shared/components';

import Header from './Header';
import Sidebar from './Sidebar';
import Board from './Board';
import IssueSearch from './IssueSearch';
import IssueCreate from './IssueCreate';
import SelectProject from './SelectProject'
import ProjectSettings from './ProjectSettings';
import {ProjectPage} from './Styles';


const setProjectSelected = (id) => {
    localStorage.setItem('projectSelected', id)
}

const getProjectSelected = () => {
    return localStorage.getItem('projectSelected')
}

const Project = () => {
    const match = useRouteMatch();
    const history = useHistory();

    const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
    const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
    const selectProject = createQueryParamModalHelpers('select-project');
    const selectedProject = getProjectSelected()
    const [{data, error, setLocalData}, fetchProject] = useApi.get(`/project/${selectedProject ? selectProject : 1}`);

    if (!data) return <PageLoader/>;
    if (error) return <PageError/>;

    const {project} = data;

    const updateLocalProjectIssues = (issueId, updatedFields) => {
        setLocalData(currentData => ({
            project: {
                ...currentData.project,
                issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
            },
        }));
    };

    if (!selectedProject && !selectProject.isOpen()) {
        selectProject.open()
    }

    const onSelectProject = (projectId) => {
        setProjectSelected(projectId)
        selectProject.close()
        fetchProject(projectId)
    }

    return (
        <Fragment>
            <Header
                selectModalOpen={selectProject.open}
                issueSearchModalOpen={issueSearchModalHelpers.open}
                issueCreateModalOpen={issueCreateModalHelpers.open}
                isButton={true}
            />
            <ProjectPage>

                <Sidebar project={project}/>

                {issueSearchModalHelpers.isOpen() && (
                    <Modal
                        isOpen
                        testid="modal:issue-search"
                        variant="aside"
                        width={600}
                        onClose={issueSearchModalHelpers.close}
                        renderContent={() => <IssueSearch project={project}/>}
                    />
                )}

                {selectProject.isOpen() && (
                    <Modal
                        isOpen
                        testid="modal:issue-create"
                        width={800}
                        withCloseIcon={false}
                        onClose={selectProject.close}
                        renderContent={modal => (
                            <SelectProject
                                onCreate={onSelectProject}
                                modalClose={modal.close}
                            />
                        )}
                    />
                )}

                {issueCreateModalHelpers.isOpen() && (
                    <Modal
                        isOpen
                        testid="modal:issue-create"
                        width={800}
                        withCloseIcon={false}
                        onClose={issueCreateModalHelpers.close}
                        renderContent={modal => (
                            <IssueCreate
                                project={project}
                                fetchProject={fetchProject}
                                onCreate={() => history.push(`${match.url}/board`)}
                                modalClose={modal.close}
                            />
                        )}
                    />
                )}

                <Route
                    path={`${match.path}/board`}
                    render={() => (
                        <Board
                            project={project}
                            fetchProject={fetchProject}
                            updateLocalProjectIssues={updateLocalProjectIssues}
                        />
                    )}
                />

                <Route
                    path={`${match.path}/settings`}
                    render={() => <ProjectSettings project={project} fetchProject={fetchProject}/>}
                />

                {match.isExact && <Redirect to={`${match.url}/board`}/>}
            </ProjectPage>
        </Fragment>
    );
};

export default Project;
