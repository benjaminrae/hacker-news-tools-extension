import { ExtensionOptions } from '../types';

export const saveOptions = async (options: ExtensionOptions) => {
  return chrome.storage.sync.set(options);
};
