import { ExtensionOptions } from '../types';

export const getOptions = () => {
  const options: ExtensionOptions = {
    widgetPositionY: 0,
    widgetPositionX: 0,
  };

  chrome.storage.sync.get(
    ['widgetPositionY', 'widgetPositionX'],
    savedOptions => {
      console.log(savedOptions);

      options.widgetPositionX = savedOptions.widgetPositionX;
      options.widgetPositionY = savedOptions.widgetPositionY;
    },
  );

  return options;
};
