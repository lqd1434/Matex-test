import { app, BrowserWindow, MessageChannelMain } from 'electron';
import * as path from 'path';
import { startServer, closeServer } from './scripts/start_server';
let mainWindow: BrowserWindow | null;
import * as signale from 'signale';

const isDev = process.env.NODE_ENV === 'development';
const gotTheLock = app.requestSingleInstanceLock();
signale.note('根路径 =>' + __dirname);
signale.note('process.cwd()=>' + process.cwd());

const { port1, port2 } = new MessageChannelMain();

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    frame: false,
    backgroundColor: '#8787D2',
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      // preload: path.resolve(process.cwd(), './electron/scripts/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.setWindowButtonVisibility(false);

  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;
  await mainWindow.loadURL(url);

  mainWindow.webContents.postMessage('port', null, [port2]);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  setTimeout(() => {
    port1.postMessage({ loading: false });
    mainWindow?.hide();
    mainWindow?.setBackgroundColor('#FFF');
    mainWindow?.setSize(1286, 700, true);
    mainWindow?.center();
    mainWindow?.setWindowButtonVisibility(true);
    setTimeout(() => {
      mainWindow?.show();
    }, 500);
  }, 3000);
}

//避免多实例
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

app.on('ready', createWindow);

app.whenReady().then(async () => {
  try {
    const startIpc = (await import('./scripts/ipc')).default;
    startIpc();
    startServer();
  } catch (e) {
    signale.error(e);
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', async (e: Electron.Event) => {
  try {
    await closeServer();
    app.quit();
    console.log('退出时间before-quit', e.timeStamp);
  } catch (e) {
    app.exit();
    signale.error(e);
  }
});
