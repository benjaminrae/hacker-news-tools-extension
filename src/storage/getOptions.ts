import { getWindowDimensions } from '../dimensions';
import { ExtensionOptions } from '../types';

export const getOptions = () => {
  return new Promise<ExtensionOptions>(resolve => {
    const { height, width } = getWindowDimensions();

    const options: ExtensionOptions = {
      widgetPositionY: height - 10,
      widgetPositionX: width - 10,
    };

    chrome.storage.sync.get(
      ['widgetPositionY', 'widgetPositionX'],
      savedOptions => {
        console.log(savedOptions);

        options.widgetPositionX = savedOptions.widgetPositionX;
        options.widgetPositionY = savedOptions.widgetPositionY;

        resolve(options);
      },
    );
  });
};
