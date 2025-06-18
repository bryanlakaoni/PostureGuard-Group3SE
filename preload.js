const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    notify: (title, body) => {
    new Notification(title, { body });
    }
});
