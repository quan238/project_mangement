import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  RelationId,
  Index,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcryptjs';
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
@Entity('User')
class User  extends BaseEntity{
  static validations = {
    name: [is.required(), is.maxLength(100)],
    email: [is.required(), is.email(), is.maxLength(200)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Index('email_index')
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { length: 2000 })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
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

  toJSON() {
    return { ...this, password: undefined };
  }

  //  Hash password before saving to database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  //  Validate password
  static async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default User;
