import { Viewport } from './Viewport';
import { createCommentPositionMaps } from './createCommentPositionMaps';
import { getWindowDimensions } from './dimensions';
import { getOptions } from './storage/getOptions';
import { saveOptions } from './storage/saveOptions';
import { nextCommentIndexStrategy } from './strategies/nextCommentStrategy';
import { previousCommentIndexStrategy } from './strategies/previousCommentStrategy';
import { inPx } from './styles/inPx';
import { loadStyles } from './styles/loadStyles';
import { scrollButtonsWidgetStyles } from './styles/scrollButtonsWidgetStyles';
import { loadScrollButtonsWidget } from './widget/scrollButtonsWidget';

const topLevelCommentQuery = "td.ind[indent='0']";
const topLevelComments =
  document.querySelectorAll<HTMLElement>(topLevelCommentQuery);

const { commentYPositionCeilMap, commentYPositionFloorMap } =
  createCommentPositionMaps(topLevelComments);

const viewport = new Viewport(window.scrollY);

// document.addEventListener('scroll', () => {
//   viewport.moveToY(window.screenY);
// });

const { container, nextButton, previousButton } = loadScrollButtonsWidget();
loadStyles(scrollButtonsWidgetStyles);

let clickX: number;
let clickY: number;
let { height, width } = getWindowDimensions();

const offsetHorizontal = 100;
const offsetVertical = 100;

container.style.top = inPx(height - offsetVertical);
container.style.left = inPx(width - offsetHorizontal);

getOptions().then(options => {
  console.log(options);

  container.style.top = inPx(
    options.widgetPositionY ?? height - offsetVertical,
  );
  container.style.left = inPx(
    options.widgetPositionX ?? width - offsetHorizontal,
  );
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

  container.style.top = inPx(positionY);
  container.style.left = inPx(positionX);
  container.style.cursor = 'grab';

  saveOptions({
    widgetPositionX: positionX,
    widgetPositionY: positionY,
  });
});

previousButton.addEventListener('click', () => {
  const commentToScrollTo = previousCommentIndexStrategy(
    viewport.yPosition,
    commentYPositionCeilMap,
  );

  if (!commentToScrollTo) {
    return;
  }

  commentToScrollTo.scrollTo();
});

nextButton.addEventListener('click', () => {
  console.log('window', window.scrollY);
  console.log('viewport', viewport.yPosition);

  const commentToScrollTo = nextCommentIndexStrategy(
    viewport.yPosition,
    commentYPositionFloorMap,
  );

  if (!commentToScrollTo) {
    return;
  }

  commentToScrollTo.scrollTo();
  viewport.moveToY(commentToScrollTo.getDomElement().getBoundingClientRect().y);

  console.log(
    'gbcr',
    commentToScrollTo.getDomElement().getBoundingClientRect().y,
  );
  console.log(viewport.yPosition);
});

window.addEventListener('resize', event => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  const widthDifference = width - newWidth;
  const heightDifference = height - newHeight;

  width = newWidth;
  height = newHeight;

  // Adjust the container's position, keeping it within the bounds with a margin of 100px
  const containerRect = container.getBoundingClientRect();

  if (Math.abs(containerRect.x - width) < offsetHorizontal) {
    let newLeft = containerRect.left - widthDifference;

    newLeft = Math.max(
      Math.min(newLeft, newWidth - 100 - containerRect.width),
      -100,
    );

    container.style.left = inPx(newLeft);
  }

  if (Math.abs(containerRect.y - height) < offsetVertical) {
    let newTop = containerRect.top - heightDifference;
    newTop = Math.max(
      Math.min(newTop, newHeight - 100 - containerRect.height),
      -100,
    );

    container.style.top = inPx(newTop);
  }

  // Ensure the new position is within the bounds with a margin of 100px

  //  saveOptions({widgetPositionY: newTop, widgetPositionX: newLeft})
});
