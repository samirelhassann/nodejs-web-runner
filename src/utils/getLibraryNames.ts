export function GetLibraryNames(content: string) {
  const regex = /import\s+'([^']*)'|import\s+"([^"]*)"|import\s+(\w+)/g;
  let match;
  const libraries = [];

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(content)) !== null) {
    libraries.push(match[1] || match[2] || match[3]);
  }

  return libraries;
}
