"use strict"

const {app, BrowserWindow} = require("electron");
const {Menu, Tray} = require("electron");
const path = require("path");

let appWindow = null;
let appTray = null;
let quit = false;

function createWindow () {	
  appWindow = new BrowserWindow({ width: 800, height: 600 });
	app.dock.show();

  appWindow.loadURL(`file://${__dirname}/index.html`);

	// appWindow.on("minimize", (event) => {
	// 	event.preventDefault();
	// 	appWindow.hide();
	// 	app.dock.hide();
	// });

	appWindow.on("close", (event) => {
		if (!app.isQuiting) {
			event.preventDefault();
			appWindow.hide();
			app.dock.hide();
		}
		return false;
	});

  appWindow.on("closed", () => {
  	appWindow = null;
  });
}

function createTray() {
	if (appTray === null) {
		let iconPath = path.join(__dirname, "images/icon.png");
		let contextMenu = Menu.buildFromTemplate([
			{
				label: "Show App",
				click: function() {
					createWindow();
				}
			},
			{
				label: "Quit",
				click: function() {
					app.isQuiting = true;
					app.quit();
				}
			}
		]);

		appTray = new Tray(iconPath);
		appTray.setContextMenu(contextMenu);
	}
}

app.on("ready", () => {
	createTray();
	createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (appWindow === null) {
    createWindow();
  } else {
  	appWindow.show();
  }
});