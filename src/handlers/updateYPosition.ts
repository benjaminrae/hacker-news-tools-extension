export const updateYPosition = (currentYPosition: number) => () => {
  const yPosition = window.scrollY;

  currentYPosition = yPosition;

  console.log(currentYPosition);
};
