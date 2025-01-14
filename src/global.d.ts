import { IpcRenderer } from 'electron';
import { ReactNode } from 'react';
declare global {

  export interface SDK {
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };

    IO: {
      writeToFile: (filePath: string, fileName: string, content: string) => ReturnType<IpcRenderer['invoke']>;
      readFromFile: (path: string) => ReturnType<IpcRenderer['invoke']>
    }

    ConfirmationDialogue: {
      invoke: (params: ConfirmationDialogueHandlerParams) => Promise<boolean>;
      listen: (id: string, result: boolean) => void;
    }
  }

  export interface Extension {
    execute: (props: {sdk: SDK}) => ReactNode;
    config: ExtensionConfiguration;
  }
  
  interface Window {
    SDK: import('./preload').SDK
  }

  export type ConfirmationDialogueHandlerParams = {title: string, message: string, onConfirm: () => void; onCancel?: () => void;}
}
