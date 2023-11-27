import { Viewport } from '../Viewport/Viewport';
import { ExtensionOptions } from '../types';

export const getOptions = () => {
  return new Promise<ExtensionOptions>(resolve => {
    const { height, width } = Viewport.getDimensions();

    const options: ExtensionOptions = {
      widgetPositionY: height - 10,
      widgetPositionX: width - 10,
    };

    chrome.storage.sync.get(
      ['widgetPositionY', 'widgetPositionX'],
      savedOptions => {
        options.widgetPositionX = savedOptions.widgetPositionX;
        options.widgetPositionY = savedOptions.widgetPositionY;

        resolve(options);
      },
    );
  });
};
