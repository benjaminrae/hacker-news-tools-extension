import { CommentMap } from './CommentMap/CommentMap';
import { TopLevelComment } from './TopLevelComment/TopLevelComment';
import { Viewport } from './Viewport/Viewport';
import { getOptions } from './storage/getOptions';
import { saveOptions } from './storage/saveOptions';
import { inPx } from './styles/inPx';
import { loadStyles } from './styles/loadStyles';
import { scrollButtonsWidgetStyles } from './styles/scrollButtonsWidgetStyles';
import { loadScrollButtonsWidget } from './widget/scrollButtonsWidget';

const topLevelCommentQuery = "td.ind[indent='0']";
const topLevelComments = Array.from(
  document.querySelectorAll<HTMLElement>(topLevelCommentQuery),
).map(comment => new TopLevelComment(comment));

const commentMap = CommentMap.from(...topLevelComments);

// document.addEventListener('scroll', () => {
//   viewport.moveToY(window.screenY);
// });

const { container, nextButton, previousButton } = loadScrollButtonsWidget();
loadStyles(scrollButtonsWidgetStyles);

let clickX: number;
let clickY: number;
let { height, width } = Viewport.getDimensions();

const offsetHorizontal = 100;
const offsetVertical = 100;

container.style.top = inPx(height - offsetVertical);
container.style.left = inPx(width - offsetHorizontal);

getOptions().then(options => {
  container.style.top = inPx(
    options.widgetPositionY ?? height - offsetVertical,
  );
  container.style.left = inPx(
    options.widgetPositionX ?? width - offsetHorizontal,
  );

  if (!Viewport.isInsideViewport(container)) {
    Viewport.moveInsideViewport(container, offsetHorizontal, offsetVertical);
  }
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

previousButton.addEventListener('click', (event: MouseEvent) => {
  event.stopPropagation();

  const yPosition = window.scrollY;

  const previous = commentMap.prev(yPosition);

  if (!previous) {
    return;
  }

  previous.scrollTo();
});

nextButton.addEventListener('click', (event: MouseEvent) => {
  event.stopPropagation();

  const yPosition = window.scrollY;
  const next = commentMap.next(yPosition);

  if (!next) {
    return;
  }

  next.scrollTo();
});

window.addEventListener('resize', event => {
  if (Viewport.isInsideViewport(container)) {
    return;
  }

  Viewport.moveInsideViewport(container, offsetHorizontal, offsetVertical);

  const { top, left } = container.getBoundingClientRect();

  saveOptions({ widgetPositionY: top, widgetPositionX: left });
});
