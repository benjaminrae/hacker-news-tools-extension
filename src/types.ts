export type CommentIndex = number | null;

export type CommentStrategy = (
  yPosition: number,
  commentMap: CommentVerticalPositionMap,
) => Element | null;

export type CommentVerticalPositionMap = Map<number, Element>;
