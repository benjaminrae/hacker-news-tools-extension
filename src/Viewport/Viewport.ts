import { inPx } from '../styles/inPx';

export class Viewport {
  constructor() {}

  public static getDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  public static isInsideViewport(element: HTMLElement) {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const { height, width } = Viewport.getDimensions();

    return top > 0 && left > 0 && bottom < height && right < width;
  }

  public static moveInsideViewport(
    element: HTMLElement,
    horizontalOffset = 0,
    verticalOffset = 0,
  ) {
    debugger;
    const { top, bottom, left, right } = element.getBoundingClientRect();
    const { height, width } = Viewport.getDimensions();

    if (left > width - horizontalOffset) {
      element.style.left = inPx(width - horizontalOffset);
    }

    if (bottom > height) {
      element.style.top = inPx(height - bottom - verticalOffset);
    }

    if (top < 0) {
      element.style.top = inPx(verticalOffset);
    }

    if (left < 0) {
      element.style.left = inPx(horizontalOffset);
    }
  }
}
