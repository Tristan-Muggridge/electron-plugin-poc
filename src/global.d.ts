import { ReactNode } from 'react';

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

  export interface Extension {
    execute: (props: {sdk: SDK}) => ReactNode;
    config: ExtensionConfiguration;
  }
  
  interface Window {
    SDK: import('./preload').SDK
  }
}
