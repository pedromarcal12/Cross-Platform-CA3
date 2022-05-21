<<<<<<< HEAD
 //To create electron extension.
const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");
=======
>>>>>>> f46c69b62b3f12ee338e0a5e33b393f170404015

const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain, Tray } = electron;

<<<<<<< HEAD
//Creating variables
let frontPageWindow;
let createWindow;
let listWindow;


fs.readFile("db.json", (err, jsonAppointments) => {
  if (!err) {
    const oldAppointments = JSON.parse(jsonAppointments);
    allAppointments = oldAppointments;
  }
});
=======
let tray = null;
let frontPageWindow;
let createWindow;
let listWindow;
let condicionWindow=false;
>>>>>>> f46c69b62b3f12ee338e0a5e33b393f170404015

app.on("ready", () => {
  frontPageWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    //Main pagecode
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

//Creating calculator window
const createWindowCreator = () => {
  createWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 600,
    height: 400,
    title: "Calculator"
  });

  //Creating windows 
  createWindow.setMenu(null);

  createWindow.loadURL(`file://${__dirname}/calculator.html`);

  createWindow.on("closed", () => (createWindow = null));
};

<<<<<<< HEAD
=======
const listWindowCreator = () => {
  listWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 600,
    height: 400,
    title: "Conclution"
  });

  listWindow.setMenu(null);

  listWindow.loadURL(`file://${__dirname}/list.html`);

  listWindow.on("closed", () => (listWindow = null));
};
>>>>>>> f46c69b62b3f12ee338e0a5e33b393f170404015


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

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
<<<<<<< HEAD
=======
        label: "All bills",
        accelerator: process.platform === "darwin" ? "Command+A" : "Ctrl+A",
        click() {
          listWindowCreator();
        }
      },

      {
>>>>>>> f46c69b62b3f12ee338e0a5e33b393f170404015
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
