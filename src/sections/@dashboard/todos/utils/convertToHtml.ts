export function convertToHtml(inputString: string): string {
  const regex = /@\[([^\]]+)\]\([^)]+\)/g;
  return inputString.replace(regex, '<strong>$1</strong>');
}
