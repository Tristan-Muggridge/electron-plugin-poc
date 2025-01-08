export {};

declare global {
  export interface SDK {
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };
    someUtility: () => string;
    IO: {
      writeToFile: (filePath: string, fileName: string, content: string) => ReturnType<IpcRenderer['invoke']>;
    }
  }
  
  interface Window {
    SDK: import('./preload').SDK
  }
}
