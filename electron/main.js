const { app, BrowserWindow } = require('electron');
const path = require('path');
const launchMode = app.commandLine.getSwitchValue('mode');
let win;

function createWindow(launchMode) {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (launchMode === 'dev') {
    win.loadURL('http://localhost:4200');
  } else {
    win.loadFile('../dist/tripod-electron-angular-arduino/index.html');
  }


  // Откройте DevTools.
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', function ()  {
  createWindow(launchMode);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow(launchMode);
  }
});
