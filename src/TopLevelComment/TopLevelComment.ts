import { Comment } from '../types';

export class TopLevelComment implements Comment {
  #domElement: HTMLElement;

  constructor(domElement: HTMLElement) {
    this.#domElement = domElement;
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
