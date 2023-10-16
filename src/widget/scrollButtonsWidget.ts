import down from '../icons/down.svg';
import up from '../icons/up.svg';

export const loadScrollButtonsWidget = () => {
  const scrollButtonsContainer = document.createElement('div');
  const scrollToPreviousCommentButton = document.createElement('button');
  const scrollToNextCommentButton = document.createElement('button');

  scrollButtonsContainer.className = 'hn-scroller';
  scrollToPreviousCommentButton.className = 'hn-scroller__previous';
  scrollToNextCommentButton.className = 'hn-scroller__next';

  scrollToPreviousCommentButton.innerHTML = up;
  scrollToPreviousCommentButton.ariaLabel =
    'Scroll to previous top level comment';

  scrollToNextCommentButton.innerHTML = down;
  scrollToNextCommentButton.ariaLabel = 'Scroll to next top level comment';

  scrollButtonsContainer.appendChild(scrollToPreviousCommentButton);

  scrollButtonsContainer.appendChild(scrollToNextCommentButton);

  document.body.appendChild(scrollButtonsContainer);

  return {
    container: scrollButtonsContainer,
    previousButton: scrollToPreviousCommentButton,
    nextButton: scrollToNextCommentButton,
  };
};
