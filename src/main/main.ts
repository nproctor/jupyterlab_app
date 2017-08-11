import {
  app, ipcMain
} from 'electron';

import {
  JupyterApplication
} from 'jupyterlab_app/src/main/app';

import {
  JupyterApplicationIPC as AppIPC
} from 'jupyterlab_app/src/ipc';

/**
 * Require debugging tools. Only
 * runs when in development.
 */
require('electron-debug')({showDevTools: false});

let jupyterApp;

/**
 * "open-file" listener should be registered before
 * app ready for "double click" files to open in application
 */
app.once('will-finish-launching', (e: Electron.Event) => {
  app.once('open-file', (event: Electron.Event, path: string) => {
    ipcMain.once(AppIPC.LAB_READY, (event: Electron.Event) => {
      event.sender.send(AppIPC.OPEN_FILES, path);
    });
  });
});

app.on('ready', () => {
  jupyterApp = new JupyterApplication();
});

