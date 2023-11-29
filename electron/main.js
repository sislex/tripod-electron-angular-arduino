const { app, BrowserWindow} = require('electron');
const { getMessages, sendMessage} = require('./messagesWeb');

const { default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS} = require("electron-devtools-installer");
const { messagesHandlerFromWeb} = require("./messagesHandlerFromWeb");


const path = require('path');
const launchMode = app.commandLine.getSwitchValue('mode');
const channelName = 'electron-angular';
let win;

function createWindow(launchMode) {
  console.log('createWindow');
  win = new BrowserWindow({
    width: 1400,
    height: 800,
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

  win.webContents.once("dom-ready", async () => {
    await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err))
      .finally(() => {
        win.webContents.openDevTools();

        getMessages(channelName, (event, message) => {
          messagesHandlerFromWeb(message, { win, channelName });
        });

        setTimeout(() => { // без таймаута не работает redux devtools
          if (launchMode === 'dev') {
            win.loadURL('http://localhost:4200');
          } else {
            win.loadFile('../dist/tripod-electron-angular-arduino/index.html');
          }

        }, 0);
      });
  });



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

