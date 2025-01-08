import { contextBridge } from 'electron';

export interface SDK {
  versions: {
    node: () => string;
    chrome: () => string;
    electron: () => string;
  };
  someUtility: () => string;
}

const sdk: SDK = {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  someUtility: () => 'This is a utility function',
};

// Expose the SDK to the renderer process
contextBridge.exposeInMainWorld('SDK', sdk);

export default sdk;