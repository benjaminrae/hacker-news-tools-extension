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
  getY(): number;
  scrollTo(): void;
  getDomElement(): HTMLElement;
}

export interface DoublyLinkedListNode<ListItem> {
  next(): DoublyLinkedListNode<ListItem> | null;
  prev(): DoublyLinkedListNode<ListItem> | null;
  value(): ListItem;
  addNext(node: DoublyLinkedListNode<ListItem>): DoublyLinkedListNode<ListItem>;
}

export interface DoublyLinkedList<ListItem> {
  length(): number;
  get(index: number): DoublyLinkedListNode<ListItem>;
  append(item: ListItem): DoublyLinkedList<ListItem>;
}
