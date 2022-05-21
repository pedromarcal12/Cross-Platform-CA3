 //To create electron extension.
const electron = require("electron");
const fs = require("fs");
const uuid = require("uuid");

const { app, BrowserWindow, Menu, ipcMain, tray } = electron;

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
    const jsonAppointments = JSON.stringify(allResults);;
    fs.writeFileSync("db.json", jsonAppointments);

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


ipcMain.on("appointment:create", (event, appointment) => {
  appointment["id"] = uuid();
  appointment["done"] = 0;
  allAppointments.push(appointment);

  sendTodayAppointments();
  createWindow.close();
});

ipcMain.on("bill:request:list", event => {
  listWindow.webContents.send("bill:response:list", allResults);
});

ipcMain.on("bill:request:frontPage", event => {
  sendTodayAppointments();
});

ipcMain.on("bill:done", (event, id) => {
  allResults.forEach(bill => {
    if (bill.id === id) bill.done = 1;
  });

  sendfrontPagebills();
});

const sendfrontPagebills = () => {
  const frontPage = new Date().toISOString().slice(0, 10);
  const filtered = allResults.filter(
    bill => bill.date === frontPage
  );
  frontPageWindow.webContents.send("appointment:response:today", filtered);
};

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
  {
    label: "View",
    submenu: [{ role: "reload" }, { role: "toggledevtools" }]
  }
];
