export type CommentIndex = number | null;

export type CommentStrategy = (
  yPosition: number,
  commentMap: CommentVerticalPositionMap,
) => Comment | null;

export type CommentVerticalPositionMap = Map<number, Comment>;

export type ExtensionOptions = {
  widgetPositionY: number;
  widgetPositionX: number;
};

export interface Comment {
  scrollTo(): void;
  getDomElement(): HTMLElement;
}
