export const cleanExtraSpaces = (str: string): string => str.replace(/(\s\s+|[\t\n])/g, ' ').trim();
