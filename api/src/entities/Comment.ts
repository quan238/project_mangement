import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import is from 'utils/validation';
import { Issue, User } from '.';

@Entity('Comment')
class Comment extends BaseEntity {
  static validations = {
    body: [is.required(), is.maxLength(50000)],
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(
    () => User,
    user => user.comments,
  )
  user: User;

  @Column('integer')
  userId: number;

  @ManyToOne(
    () => Issue,
    issue => issue.comments,
    { onDelete: 'CASCADE' },
  )
  issue: Issue;

  @Column('integer')
  issueId: number;
}

export default Comment;
