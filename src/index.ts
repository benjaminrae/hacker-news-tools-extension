import { nextCommentIndexStrategy } from './strategies/nextCommentStrategy';
import { previousCommentIndexStrategy } from './strategies/previousCommentStrategy';
import { loadScrollButtonsWidget } from './widget/scrollButtonsWidget';
import { loadStyles } from './widget/styles';

const topLevelComments = document.querySelectorAll("td.ind[indent='0']");

console.log(topLevelComments);

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

function scrollToElement(element: Element) {
  element.scrollIntoView({
    behavior: 'smooth',
  });

  const elementYPosition = element.getBoundingClientRect().y;

  currentYPosition = elementYPosition;
}
