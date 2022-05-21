const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");

const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain, Tray } = electron;

/*Creating variables*/
let frontPageWindow;
let createWindow;
let listWindow;

fs.readFile("db.json", (err, jsonAppointments) => {
  if (!err) {
    const oldAppointments = JSON.parse(jsonAppointments);
    allAppointments = oldAppointments;
  }
});

app.on("ready", () => {
  frontPageWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    /*Main pagecode*/
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

/*Creating calculator window*/
const createWindowCreator = () => {
  createWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 600,
    height: 400,
    title: "Calculator"
  });

 /*Creating windows */
  createWindow.setMenu(null);

  createWindow.loadURL(`file://${__dirname}/calculator.html`);

  createWindow.on("closed", () => (createWindow = null));
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
/* menuTemplate and sub where you can go  to another window*/
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
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  },
  /*this submenu is very important to debug the program when something goes wrong*/
  {
    label: "View",
    submenu: [{ role: "reload", accelerator: process.platform === "darwin" ? "Command+R" : "Ctrl+R"}, 
    { role: "toggledevtools" , accelerator: process.platform === "darwin" ? "Command+T" : "Ctrl+T" }]
  }
];
