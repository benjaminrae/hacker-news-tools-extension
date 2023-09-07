import { CommentStrategy } from '../types';

export const nextCommentIndexStrategy: CommentStrategy = (
  position,
  comments,
) => {
  const commentPositions = Array.from(comments.keys()).sort(
    (key1, key2) => key1 - key2,
  );
  console.log(position);
  console.log(commentPositions);

  const nextCommentPosition = commentPositions.find(
    commentPosition => commentPosition > position,
  );

  if (!nextCommentPosition) {
    return null;
  }

  const nextComment = comments.get(nextCommentPosition);

  if (!nextComment) {
    return null;
  }

  return nextComment;
};
