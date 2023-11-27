const socketUrl = new URL(`ws://localhost:9000`);

const socket = new WebSocket(socketUrl.toString());

chrome.runtime.onInstalled.addListener(event => {
  if (event.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    chrome.tabs.reload();
  }
});

socket.addEventListener('message', message => {
  if (message.data === 'RELOAD') {
    chrome.runtime.reload();
  }
});
