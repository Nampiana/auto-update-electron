const { app, BrowserWindow, dialog, autoUpdater } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL("http://localhost:5173"); // URL du serveur Vite pendant le dev
  
  // Vérifier les mises à jour
  autoUpdater.checkForUpdatesAndNotify();
});

// Événement pour afficher la mise à jour disponible
autoUpdater.on("update-available", () => {
  dialog.showMessageBox({
    type: "info",
    title: "Mise à jour disponible",
    message: "Une nouvelle version est disponible. Voulez-vous mettre à jour maintenant ?",
    buttons: ["Oui", "Non"]
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  });
});

// Télécharger la mise à jour
autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox({
    type: "info",
    title: "Mise à jour prête",
    message: "Redémarrer pour appliquer la mise à jour ?",
    buttons: ["Redémarrer", "Plus tard"]
  }).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});
