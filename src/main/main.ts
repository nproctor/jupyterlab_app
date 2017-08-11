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
app.on('will-finish-launching', () => {
  app.on('open-file', (event: any, path: string) => {
    ipcMain.on(AppIPC.READY_FOR_FILES, (event: any) => {
      event.sender.send(AppIPC.OPEN_FILES, path);
    });
  });
});

app.on('ready', () => {
  jupyterApp = new JupyterApplication();
});

