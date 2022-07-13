import {Project, User} from 'entities';
import {catchErrors} from 'errors';
import {findEntityOrThrow, updateEntity} from 'utils/typeorm';
import {issuePartial} from 'serializers/issues';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
    const project = await findEntityOrThrow(Project, req.params.issueId, {
        relations: ['users', 'issues'],
    });
  
    res.respond({
        project: {
            ...project,
            issues: project.issues.map(issuePartial),
        },
    });
});

export const getYourProject = catchErrors(async (req, res) => {
    const userId = req.currentUser.id;
    console.log(userId)
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
