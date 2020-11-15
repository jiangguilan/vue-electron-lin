const { app, BrowserWindow } = require('electron')

let isDevEnv = true;

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (isDevEnv) {
        win.loadURL('http://localhost:8080/')
    } else {
        win.loadFile('./src/index.html')
    }
    let webService = require("./service/web/index");
    webService.start();
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})