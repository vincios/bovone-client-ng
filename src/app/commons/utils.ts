import random from 'lodash-es/random';
import values from 'lodash-es/values';
import remove from 'lodash-es/remove';
import {TranslateService} from "@ngx-translate/core";

export const colors = {
  primary:  '#51cbce',
  success:  '#6bd098',
  info:     '#51bcda',
  warning:  '#fbc658',
  danger:   '#ef8157',
  purple:   '#c178c1',
  brown:    '#dcb285',
  grey:     '#ecdddd',
  blue:     '#1DC7EA',
  violet:   '#9368E9',
  red:      '#FB404B',
  green:    '#87CB16',
  orange:   '#FFA534',
  darkBlue: '#1F77D0',
  black:    '#5e5e5e',
};

/**
 * Returns random colors from <i>colors</i> object. If no arguments are provided (or <i>number</i> is 1) a single color
 * is returned. Otherwise returns a list of <i>number</i> colors
 *
 * @param quantity number of colors to return. MUST be between 1 and <i>colors.length</i> (actually, 15)
 * @returns a color or a list of colors
 */
export function getRandomColors(quantity: number = 1) {
  const colorsList = values(colors);

  if (quantity === 1) {
    return colorsList[random(colorsList.length)];
  }

  const toReturn = [];
  for (let i = 0; i < quantity; i++) {
    const rand = random(colorsList.length);
    toReturn.push(colorsList[rand]);

    // remove choosen element to avoid duplicates
    if (quantity <= colorsList.length) { // but only if we have enough colors to avoid duplicates
      remove(colorsList, (value, index) => index === random);
    }
  }

  return toReturn;
}

/**
 * Translate <i>str</i> if it starts with "translate:"
 *
 * @param str string to translate. It will be translated if it has the following form: <i>translate:TRANSLATION.KEY.PATH</i>
 * @param translateService
 */
export function translateIfNecessary(str: string, translateService: TranslateService) {
  if (typeof str !== 'string') {
    return str;
  }

  if (str.startsWith('translate:')) {
    const [prefix, key] = str.split(':');
    return translateService.instant(key.toUpperCase());
  }

  return str;
}
