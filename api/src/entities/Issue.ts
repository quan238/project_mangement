import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationId,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import is from 'utils/validation';
import { IssueType, IssueStatus, IssuePriority } from 'constants/issues';
import { Comment, Project, User } from '.';

/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The issue ID.
 *           example: 1
 *         title:
 *           type: string
 *           description: The issue's title.
 *           example: issue 1
 *         type:
 *           type: string
 *           description: The issue's type.
 *           example: story
 *         priority:
 *           type: string
 *           description: The issue's priority.
 *           example: 1
 *         listPosition:
 *           type: number
 *           description: The issue's position.
 *           example: 1
 *         description:
 *           type: string
 *           description: The issue's position.
 *           example: The description text
 *         descriptionText:
 *           type: string
 *           description: The issue's position.
 *           example: <h1>HTML Text</h1>
 *         estimate:
 *           type: number
 *           description: The issue's estimate time.
 *           example: 4
 *         timeSpent:
 *           type: number
 *           description: The issue's time spent.
 *           example: 10
 *         timeRemaining:
 *           type: number
 *           description: The issue's time remaining.
 *           example: 10
 *         createdAt:
 *           type: Date
 *           description: The issue's time createdAt.
 *           example: 10
 *         updatedAt:
 *           type: Date
 *           description: The issue's time updatedAt.
 *           example: 10
 *         reporterId:
 *           type: number
 *           description: The issue's reporterId.
 *           example: 10
 *         projectId:
 *           type: number
 *           description: The issue's projectId.
 *           example: 10
 */
@Entity('Issue')
class Issue extends BaseEntity {
  static validations = {
    title: [is.required(), is.maxLength(200)],
    type: [is.required(), is.oneOf(Object.values(IssueType))],
    status: [is.required(), is.oneOf(Object.values(IssueStatus))],
    priority: [is.required(), is.oneOf(Object.values(IssuePriority))],
    listPosition: is.required(),
    reporterId: is.required(),
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  type: IssueType;

  @Column('varchar')
  status: IssueStatus;

  @Column('varchar')
  priority: IssuePriority;

  @Column('double precision')
  listPosition: number;

  @Column('text', { nullable: true })
  description: string | null;

  @Column('text', { nullable: true })
  descriptionText: string | null;

  @Column('integer', { nullable: true })
  estimate: number | null;

  @Column('integer', { nullable: true })
  timeSpent: number | null;

  @Column('integer', { nullable: true })
  timeRemaining: number | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('integer')
  reporterId: number;

  @ManyToOne(
    () => Project,
    project => project.issues,
  )
  project: Project;

  @Column('integer')
  projectId: number;

  @OneToMany(
    () => Comment,
    comment => comment.issue,
  )
  comments: Comment[];

  @ManyToMany(
    () => User,
    user => user.issues,
  )
  @JoinTable()
  users: User[];

  @RelationId((issue: Issue) => issue.users)
  userIds: number[];

  @BeforeInsert()
  @BeforeUpdate()
  setDescriptionText = (): void => {
    if (this.description) {
      this.descriptionText = striptags(this.description);
    }
  };
}

export default Issue;
