const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain, Tray } = electron;

let tray = null;
let frontPageWindow;
let createWindow;
let listWindow;

app.on("ready", () => {
  frontPageWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    title: "Electricy Bill App"
  });
  
  frontPageWindow.loadURL(`file://${__dirname}/frontPage.html`);
  frontPageWindow.on("closed", () => {
  
    app.quit();
    frontPageWindow = null;
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const createWindowCreator = () => {
  createWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 600,
    height: 400,
    title: "Calculator"
  });

  createWindow.setMenu(null);

  createWindow.loadURL(`file://${__dirname}/calculator.html`);

  createWindow.on("closed", () => (createWindow = null));
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
/* */
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New bill",
        accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
        click() {
          createWindowCreator();
         
        }
      },

      {
        label: "All bills",
        accelerator: process.platform === "darwin" ? "Command+A" : "Ctrl+A",
        click() {
          listWindowCreator();
        }
      },

      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "View",
    submenu: [{ role: "reload", accelerator: process.platform === "darwin" ? "Command+R" : "Ctrl+R"}, 
    { role: "toggledevtools" , accelerator: process.platform === "darwin" ? "Command+T" : "Ctrl+T" }]
  }
];
