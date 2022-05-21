/* eslint-disable class-methods-use-this */
import { Comment } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity } from 'utils/typeorm';
import { Get, Route } from 'tsoa';
import { Request, Response } from 'express';

export const create = catchErrors(async (req, res) => {
  const comment = await createEntity(Comment, req.body);
  res.respond({ comment });
});

export const update = catchErrors(async (req, res) => {
  const comment = await updateEntity(Comment, req.params.commentId, req.body);
  res.respond({ comment });
});

export const remove = catchErrors(async (req, res) => {
  const comment = await deleteEntity(Comment, req.params.commentId);
  res.respond({ comment });
});

@Route('comment')
export default class CommentController {
  @Get('/')
  public async createComment(req: Request, res: Response): Promise<boolean> {
    const comment = await createEntity(Comment, req.body);
    res.respond({ comment });
    return true;
  }
}
