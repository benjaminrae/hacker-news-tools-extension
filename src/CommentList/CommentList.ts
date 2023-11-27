import { Comment, DoublyLinkedList, DoublyLinkedListNode } from '../types';
import { CommentListNode } from './CommentListNode';

export class CommentList implements DoublyLinkedList<Comment> {
  public head: CommentListNode | null = null;
  public tail: CommentListNode | null = null;
  #size: number = 0;

  private constructor(...args: Comment[]) {
    args.forEach(comment => {
      this.append(comment);
    });
  }

  public static from(iterable: Iterable<Comment>): CommentList {
    return new CommentList(...iterable);
  }

  append(item: Comment): CommentList {
    const node = new CommentListNode({
      list: this,
      comment: item,
      prev: this.tail,
      next: null,
    });

    if (!this.head && !this.tail) {
      this.head = node;
      this.tail = node;
    }

    this.tail?.addNext(node);
    this.tail = node;

    this.#size++;

    return this;
  }

  length(): number {
    return this.#size;
  }

  get(index: number): DoublyLinkedListNode<Comment> {
    throw new Error('Method not implemented.');
  }
}
