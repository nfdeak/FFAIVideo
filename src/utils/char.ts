const removeSpecialCharacters = (str: string) => {
  const cnRegex =
    /[，。！？、；：“”‘’（）《》【】〈〉「」『』【】〔〕〖〗〈〉《》「」『』【】〔〕【】﹝﹞（）［］｛｝＜＞﹤﹥「」『』【】＜＞《》「」『』【】]/g;
  const enRegex = /[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~]/g;
  return str.replace(cnRegex, '').replace(enRegex, '');
};

const normalizeWhitespace = (text: string): string => {
  return text
    .replace('\n', ' ')
    .replace('[', ' ')
    .replace(']', ' ')
    .replace('(', ' ')
    .replace(')', ' ')
    .replace('{', ' ')
    .replace('}', ' ')
    .trim();
};

const splitStringAtIndex = (arr: string[], index: number, x: number) => {
  if (index >= 0 && index < arr.length) {
    const str = arr[index];
    if (x >= 0 && x < str.length) {
      const firstPart = str.slice(0, x);
      const secondPart = str.slice(x);
      arr.splice(index, 1, firstPart, secondPart);
    }
  }
  return arr;
};

const insertStringAt = (
  str: string,
  index: number,
  toInsert: string,
): string => {
  if (index > str.length || index < 0) {
    throw new Error('Index out of bounds');
  }
  return str.slice(0, index) + toInsert + str.slice(index);
};

const safeDecodeURIComponent = (str: string) => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

const removeBlankLines = (text: string) => {
  return text
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n');
};

const addLineBreaks = (lineText: string, subtitleMaxWidth: number): string => {
  const words = lineText.split(' '); // Split the text into words
  let result = '';
  let currentLine = '';

  for (const word of words) {
    // Check if adding the next word would exceed the line width
    if ((currentLine + word).length <= subtitleMaxWidth) {
      currentLine += (currentLine.length > 0 ? ' ' : '') + word;
    } else {
      // Add the current line to the result and start a new line
      if (result.length > 0) result += '\\N';
      result += currentLine;
      currentLine = word; // Start the new line with the current word
    }
  }

  // Add the last line to the result
  if (currentLine.length > 0) {
    if (result.length > 0) result += '\\N';
    result += currentLine;
  }

  return result;
};

export {
  addLineBreaks,
  removeBlankLines,
  insertStringAt,
  normalizeWhitespace,
  splitStringAtIndex,
  safeDecodeURIComponent,
  removeSpecialCharacters,
};
