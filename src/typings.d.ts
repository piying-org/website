declare module '*.txt' {
  const content: string;
  export default content;
}
declare namespace AMDLoader {
  const global: Window;
}
declare const monaco: typeof import('monaco-editor');
