const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let win;
let tray;


function createWindow() {
    win = new BrowserWindow({
    width: 1980,
    height: 1080,
    fullscreen: false,
    frame: true,    
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        backgroundThrottling: false,
        }
    });

    win.loadFile('1web assets/Homepage/index.html');

    win.on('minimize', (e) => e.preventDefault());
    win.on('close', (e) => {
    if (!app.isQuiting) {
        e.preventDefault();
        win.hide();
        }
    });
}



app.whenReady().then(() => {
    createWindow();

    const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'LogoBGgreenNoBG.png')); // Use your own
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Open Posture Guard',
        click: () => win.show()
    },
    {
        label: 'Quit',
        click: () => {
        app.isQuiting = true;
        app.quit();
        }
    }
    ]);
    tray.setToolTip('Posture Guard is running in background');
    tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
