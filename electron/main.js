const { app, BrowserWindow} = require('electron');
const { getMessages, sendMessage} = require('./messagesWeb');

const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS} = require("electron-devtools-installer");
const { messagesHandlerFromWeb} = require("./messagesHandlerFromWeb");


const path = require('path');
const launchMode = app.commandLine.getSwitchValue('mode');
const channelName = 'electron-angular';
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
    win.loadURL('http://localhost:4200?channelName=' + channelName);
    win.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err))
        .finally(() => {
          win.webContents.openDevTools();
        });
    });
  } else {
    win.loadFile('../dist/tripod-electron-angular-arduino/index.html', {
      query: { 'channelName': channelName }
    });
  }

  // Откройте DevTools.
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('did-finish-load', () => {
    getMessages(channelName, (event, message) => {
      messagesHandlerFromWeb(message, { win, channelName });
    });
    // sendMessage(win, channelName, 'Сообщение из Electron!!!'); // Отправить сообщение в Angular через канал
    // setupSerialPort(); // Инициализируем обработчики serialPort
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

