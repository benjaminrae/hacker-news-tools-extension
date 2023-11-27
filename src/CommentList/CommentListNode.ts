import { Comment, DoublyLinkedListNode } from '../types';
import { CommentList } from './CommentList';

export type CommentListNodeOptions = {
  comment: Comment;
  prev: CommentListNode | null;
  next: CommentListNode | null;
  list: CommentList;
};

export class CommentListNode implements DoublyLinkedListNode<Comment> {
  list: CommentList;
  nextNode: CommentListNode | null;
  prevNode: CommentListNode | null;
  #comment: Comment;

  constructor({
    comment,
    prev = null,
    next = null,
    list,
  }: CommentListNodeOptions) {
    this.list = list;
    this.prevNode = prev;
    this.nextNode = next;
    this.#comment = comment;
  }

  next(): CommentListNode | null {
    return this.nextNode;
  }

  prev(): CommentListNode | null {
    return this.prevNode;
  }

  value(): Comment {
    return this.#comment;
  }

  addNext(node: CommentListNode): CommentListNode {
    this.nextNode = node;
    return this;
  }
}
