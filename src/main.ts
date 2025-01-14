import { app, BrowserWindow, ipcMain, dialog, BaseWindow } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

import fs from 'fs'

ipcMain.handle("write-to-file", async (event, { filePath, fileName, content }: { filePath: string; fileName: string; content: string }) => {
  try {

    console.log(filePath, fileName, content)

    fs.mkdirSync(filePath, {recursive: true});
    fs.writeFileSync(path.join(filePath, fileName), content, "utf8");

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle("read-from-file", async (event, { path }: { path: string }) => {
  try {
    const content = fs.readFileSync(path, "utf8");
    console.log(content)
    
    return content;
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.on('confirmationDialogue', (event, {id, title, message, onConfirm, onCancel}: {id: number} & ConfirmationDialogueHandlerParams) => {
  console.log(title, message, onConfirm, onCancel)
  
  dialog.showMessageBox((window), {
      'type': 'question',
      title,
      message,
      'buttons': [
          'Yes',
          'No'
      ]
  }).then(result => {
    window.webContents.send('confirmationResponse', result.response === 0);
  });
})

let window: BaseWindow;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    alwaysOnTop: true,
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  window = mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.