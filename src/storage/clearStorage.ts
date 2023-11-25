export const clearStorage = () => {
  return chrome.storage.sync.clear();
};

clearStorage();
