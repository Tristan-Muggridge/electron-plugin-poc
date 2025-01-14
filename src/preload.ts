import { contextBridge, ipcRenderer } from 'electron';

const sdk: SDK = {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
  },
  
  IO: {
    writeToFile(filePath, fileName, content) {
      return ipcRenderer.invoke("write-to-file", { filePath, fileName, content })
    },
    readFromFile(path) {
      return ipcRenderer.invoke("read-from-file", {path})
    }
  },
};

// Expose the SDK to the renderer process
contextBridge.exposeInMainWorld('SDK', sdk);
contextBridge.exposeInMainWorld(
  // Allowed 'ipcRenderer' methods
  'ipcRenderer', {
      // From render to main
      confirmationDialogue: (params: any) => {
          ipcRenderer.send('confirmationDialogue', params);
      },
      
      // From main to render
      confirmationResponse: (response: any) => {
          ipcRenderer.on('confirmationResponse', response);
      }
  }
);

export default sdk;