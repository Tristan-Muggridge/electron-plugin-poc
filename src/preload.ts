import { contextBridge, ipcRenderer } from 'electron';

const sdk: SDK = {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  someUtility: () => 'This is a utility function',
  IO: {
    writeToFile(filePath, fileName, content) {
      return ipcRenderer.invoke("write-to-file", { filePath, fileName, content })
    },
  }
};

// Expose the SDK to the renderer process
contextBridge.exposeInMainWorld('SDK', sdk);

export default sdk;