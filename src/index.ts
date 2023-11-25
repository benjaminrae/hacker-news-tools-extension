import { getWindowDimensions } from './dimensions';
import { getOptions } from './storage/getOptions';
import { saveOptions } from './storage/saveOptions';
import { nextCommentIndexStrategy } from './strategies/nextCommentStrategy';
import { previousCommentIndexStrategy } from './strategies/previousCommentStrategy';
import { loadScrollButtonsWidget } from './widget/scrollButtonsWidget';
import { loadStyles } from './widget/styles';

const topLevelComments = document.querySelectorAll("td.ind[indent='0']");

const commentYPositionFloorMap = new Map<number, Element>();
const commentYPositionCeilMap = new Map<number, Element>();

for (const comment of topLevelComments) {
  const commentYPosition = comment.getBoundingClientRect().y;

  commentYPositionFloorMap.set(Math.floor(commentYPosition), comment);
  commentYPositionCeilMap.set(Math.ceil(commentYPosition), comment);
}

let currentYPosition: number = window.scrollY;

document.addEventListener('scroll', () => {
  const yPosition = window.scrollY;

  currentYPosition = yPosition;
});

const { container, nextButton, previousButton } = loadScrollButtonsWidget();
loadStyles();

container.draggable = true;

let clickX: number;
let clickY: number;
const { height, width } = getWindowDimensions();

console.log(height, width);

getOptions().then(options => {
  console.log(options);

  container.style.top = `${options.widgetPositionY ?? height - 10}px`;
  container.style.left = `${options.widgetPositionX ?? width - 10}px`;
});

container.addEventListener('mousedown', event => {
  if (!event.target) {
    return;
  }

  clickX = event.clientX - container.getBoundingClientRect().x;
  clickY = event.clientY - container.getBoundingClientRect().y;

  container.style.cursor = 'grabbing';
});

container.addEventListener('dragstart', event => {
  console.log('drag start');
  if (!event.dataTransfer) {
    return;
  }
  event.dataTransfer.setData('text/plain', 'This text may be dragged');
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
});

document.addEventListener('dragover', event => {
  event.preventDefault();
});

container.addEventListener('dragend', event => {
  console.log('drag end');

  if (!event.dataTransfer) {
    return;
  }

  if (!event.target) {
    return;
  }

  const positionX = event.pageX - clickX;
  const positionY = event.pageY - clickY;

  container.style.top = `${positionY}px`;
  container.style.left = `${positionX}px`;
  container.style.cursor = 'grab';

  saveOptions({
    widgetPositionX: positionX,
    widgetPositionY: positionY,
  });
});

previousButton.addEventListener('click', () => {
  const commentToScrollTo = previousCommentIndexStrategy(
    currentYPosition,
    commentYPositionCeilMap,
  );

  if (!commentToScrollTo) {
    return;
  }

  scrollToElement(commentToScrollTo);
});

nextButton.addEventListener('click', () => {
  const commentToScrollTo = nextCommentIndexStrategy(
    currentYPosition,
    commentYPositionFloorMap,
  );

  if (!commentToScrollTo) {
    return;
  }

  scrollToElement(commentToScrollTo);
});

const scrollToElement = (element: Element) => {
  element.scrollIntoView({
    behavior: 'smooth',
  });

  const elementYPosition = element.getBoundingClientRect().y;

  currentYPosition = elementYPosition;
};
