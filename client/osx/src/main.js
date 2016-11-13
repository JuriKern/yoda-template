const {app, BrowserWindow} = require("electron");
const {Menu, Tray} = require("electron");
const path = require("path");

let appWindow = null;
let appTray = null;

function createWindow () {
	if (appWindow !== null) {
		return false;
	}

  appWindow = new BrowserWindow({ width: 800, height: 600 });
	app.dock.show();

  appWindow.loadURL(`file://${__dirname}/index.html`);

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

	return true;
}

function showWindow() {
	if (appWindow === null) {
		return false;
	}

	if (!appWindow.isVisible()) {
		appWindow.show();
		app.dock.show();
	}

	return true;
}

function createTray() {
	if (appTray !== null) {
		return false;
	}

	let iconPath = path.join(__dirname, "images/icon.png");
	let contextMenu = Menu.buildFromTemplate([
		{
			label: "Show App",
			click: function() {
				if (!showWindow()) {
					createWindow();
				}
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

	return true;
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
	if (!showWindow()) {
		createWindow();
	}
});