export class Viewport {
  yPosition: number;

  constructor(yPosition: number) {
    this.yPosition = yPosition;
  }

  moveToY(y: number) {
    this.yPosition = y;
  }
}
