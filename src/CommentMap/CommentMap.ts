import { Comment } from '../types';

export class CommentMap {
  #comments: Map<number, Comment>;
  #ceilComments: Map<number, Comment>;
  #floorComments: Map<number, Comment>;

  constructor() {
    this.#comments = new Map();
    this.#ceilComments = new Map();
    this.#floorComments = new Map();
  }

  add(comment: Comment): void {
    this.#comments.set(comment.getY(), comment);
    this.#floorComments.set(Math.floor(comment.getY()), comment);
    this.#ceilComments.set(Math.ceil(comment.getY()), comment);
  }

  get(yPosition: number): Comment | null {
    return this.#comments.get(yPosition) ?? null;
  }

  next(yPosition: number) {
    const commentPositions = Array.from(this.#floorComments.keys()).sort(
      (key1, key2) => key1 - key2,
    );

    const nextCommentPosition = commentPositions.find(
      commentPosition => commentPosition > yPosition,
    );

    if (!nextCommentPosition) {
      return null;
    }

    const nextComment = this.#floorComments.get(nextCommentPosition);

    if (!nextComment) {
      return null;
    }

    this.highlightCommentParent(nextComment);

    return nextComment;
  }

  prev(yPosition: number) {
    const commentPositions = Array.from(this.#ceilComments.keys()).sort(
      (key1, key2) => key2 - key1,
    );

    const previousCommentPosition = commentPositions.find(
      commentPosition => commentPosition < yPosition,
    );

    if (!previousCommentPosition) {
      return null;
    }

    const previousComment = this.#ceilComments.get(previousCommentPosition);

    if (!previousComment) {
      return null;
    }

    this.highlightCommentParent(previousComment);

    return previousComment;
  }

  highlightComment(comment: Comment): void {
    const commentElement = comment.getDomElement();

    commentElement.classList.add('hn-highlight');

    setTimeout(() => {
      commentElement.classList.remove('hn-highlight');
    }, 2000);
  }

  highlightCommentParent(comment: Comment): void {
    const commentElement = comment.getDomElement();

    const parent = commentElement.parentElement;

    if (!parent) {
      return;
    }

    parent.classList.add('hn-highlight');

    setTimeout(() => {
      parent.classList.remove('hn-highlight');
    }, 2000);
  }

  public static from(...args: Comment[]): CommentMap {
    const commentMap = new CommentMap();

    args.forEach(comment => commentMap.add(comment));

    return commentMap;
  }
}
