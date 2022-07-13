import {Project, User} from 'entities';
import {catchErrors} from 'errors';
import {createEntity, findEntityOrThrow, updateEntity} from 'utils/typeorm';
import {issuePartial} from 'serializers/issues';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
    const {projectId} = req.query;

    const project = await findEntityOrThrow(Project, projectId as string, {
        relations: ['users', 'issues'],
    });

    res.respond({
        project: {
            ...project,
            issues: project.issues.map(issuePartial),
        },
    });
});

export const create = catchErrors(async (req, res) => {
    const project = await createEntity(Project, req.body)
    res.respond({project});
});

export const getYourProject = catchErrors(async (req, res) => {
    const userId = req.currentUser.id;

    const project = await Project.createQueryBuilder('project')
        .relation(User, 'project')
        .of(userId)
        .loadMany();
    res.respond(project);
});

export const update = catchErrors(async (req, res) => {
    const project = await updateEntity(Project, req.currentUser.projectId, req.body);
    res.respond({project});
});
