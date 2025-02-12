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

  mainWindow.loadURL("http://localhost:3000"); // URL du serveur Vite pendant le dev
  
  // 🔥 Vérifier les mises à jour au démarrage
  autoUpdater.checkForUpdatesAndNotify();
});

// 📢 Événement quand une mise à jour est disponible
autoUpdater.on("update-available", () => {
  console.log("✅ Mise à jour disponible !");
  dialog.showMessageBox({
    type: "info",
    title: "Mise à jour disponible",
    message: "Une nouvelle version est disponible. Voulez-vous mettre à jour maintenant ?",
    buttons: ["Oui", "Non"]
  }).then((result) => {
    if (result.response === 0) {
      console.log("📥 Téléchargement de la mise à jour...");
      autoUpdater.downloadUpdate();
    }
  });
});

// 📢 Événement quand la mise à jour est téléchargée
autoUpdater.on("update-downloaded", () => {
  console.log("✅ Mise à jour téléchargée !");
  dialog.showMessageBox({
    type: "info",
    title: "Mise à jour prête",
    message: "L'application va redémarrer pour appliquer la mise à jour.",
    buttons: ["Redémarrer maintenant", "Plus tard"]
  }).then((result) => {
    if (result.response === 0) {
      console.log("🔄 Redémarrage et installation...");
      autoUpdater.quitAndInstall();
    }
  });
});

// 📢 Gérer les erreurs de mise à jour
autoUpdater.on("error", (error) => {
  console.error("❌ Erreur de mise à jour :", error);
});
