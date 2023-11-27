import { TopLevelComment } from './TopLevelComment/TopLevelComment';

export const createCommentPositionMaps = (
  comments: NodeListOf<HTMLElement>,
) => {
  const commentYPositionFloorMap = new Map<number, TopLevelComment>();
  const commentYPositionCeilMap = new Map<number, TopLevelComment>();

  for (const comment of comments) {
    const commentYPosition = comment.getBoundingClientRect().y;

    commentYPositionFloorMap.set(
      Math.floor(commentYPosition),
      new TopLevelComment(comment),
    );
    commentYPositionCeilMap.set(
      Math.ceil(commentYPosition),
      new TopLevelComment(comment),
    );
  }

  return {
    commentYPositionFloorMap,
    commentYPositionCeilMap,
  };
};
