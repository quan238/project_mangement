import { prisma } from 'database/prisma';
import { catchErrors } from 'errors';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  // const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
  //   relations: ['users', 'issues'],
  // });
  // res.respond({
  //   project: {
  //     ...project,
  //     issues: project.issues.map(issuePartial),
  //   },
  // });

  const { projectId } = req.currentUser;

  const project = await prisma.project.findMany({
    where: { id: projectId },
    include: {
      issue: true,
      user: true,
    },
  });

  console.log(project);
});

export const update = catchErrors(async (req, res) => {
  // const project = await updateEntity(Project, req.currentUser.projectId, req.body);
  // res.respond({ project });
});
