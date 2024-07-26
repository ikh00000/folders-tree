export const pathsExample: string[] = [
  'root',
  '/root',
  'root/',
  '/root/',
  '',
  '/',
  '/root/something/somewhere',
  '/root/test',
  '/dev/null',
  '/root/something/somewhere/file',
];

export const pathExamplePlaceholder: string = `Provide paths like in this example: \n${JSON.stringify(pathsExample, null, 2)}`;

export const text = {
  hello: 'Hello 👋',
  help: 'To create the folder structure, please provide the paths.',
  createBtn: 'Create',
  clearBtn: 'Clear',
  result: 'Result:',
  emptyResult: '💡 Click Create button to generate the result.',
  nothingToRender: '🤷 Nothing to render. Paths returned empty tree.',
  invalidFormat:
    '❌ Invalid format. Please provide a valid JSON array of paths.',
  howItWorks: 'How it works?',
};
