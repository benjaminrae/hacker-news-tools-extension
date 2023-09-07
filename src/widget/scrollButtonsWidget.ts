export const loadScrollButtonsWidget = () => {
  const scrollButtonsContainer = document.createElement('div');
  const scrollToPreviousCommentButton = document.createElement('button');
  const scrollToNextCommentButton = document.createElement('button');

  scrollButtonsContainer.className = 'hn-scroller';
  scrollToPreviousCommentButton.className = 'hn-scroller__previous';
  scrollToNextCommentButton.className = 'hn-scroller__next';

  scrollToPreviousCommentButton.innerText = '🔼';
  scrollToNextCommentButton.innerText = '🔽';

  scrollButtonsContainer.appendChild(scrollToPreviousCommentButton);

  scrollButtonsContainer.appendChild(scrollToNextCommentButton);

  document.body.appendChild(scrollButtonsContainer);

  return {
    container: scrollButtonsContainer,
    previousButton: scrollToPreviousCommentButton,
    nextButton: scrollToNextCommentButton,
  };
};
