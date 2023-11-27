export const scrollButtonsWidgetStyles = `
.hn-scroller {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: grab;
}

.hn-scroller__previous,
.hn-scroller__next {
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.popup {
  height: 400px;
  width: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.button {
  all: unset;
  font-family: inherit;
  cursor: pointer;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border: 1px solid black;
}

`;
