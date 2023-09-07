import { CommentStrategy } from '../types';

export const previousCommentIndexStrategy: CommentStrategy = (
  position,
  comments,
) => {
  const commentPositions = Array.from(comments.keys()).sort(
    (key1, key2) => key2 - key1,
  );
  console.log(position);
  console.log(commentPositions);

  const previousCommentPosition = commentPositions.find(
    commentPosition => commentPosition < position,
  );

  if (!previousCommentPosition) {
    return null;
  }

  const previousComment = comments.get(previousCommentPosition);

  if (!previousComment) {
    return null;
  }

  return previousComment;
};
