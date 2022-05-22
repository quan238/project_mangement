import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';

import is from 'utils/validation';
import { Comment, Issue, Project } from '.';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
@Entity("User")
class User extends BaseEntity {
  static validations = {
    name: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { length: 2000 })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    () => Comment,
    comment => comment.user,
  )
  comments: Comment[];

  @ManyToMany(
    () => Issue,
    issue => issue.users,
  )
  issues: Issue[];

  @ManyToOne(
    () => Project,
    project => project.users,
  )
  project: Project;

  @RelationId((user: User) => user.project)
  projectId: number;
}

export default User;
