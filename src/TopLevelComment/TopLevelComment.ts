import { Comment } from '../types';

export class TopLevelComment implements Comment {
  #domElement: HTMLElement;

  constructor(domElement: HTMLElement) {
    this.#domElement = domElement;
  }
  getY(): number {
    return this.#domElement.getBoundingClientRect().y;
  }

  getDomElement(): HTMLElement {
    return this.#domElement;
  }

  scrollTo(): void {
    this.#domElement.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
