const css = `
.hn-scroller {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

`;

export const loadStyles = () => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
};
