import type { IElectronApi } from "@main-process/models/IElectronApi";
import { contextBridge, ipcRenderer } from "electron";

// Doesn't really work this way round but could maybe do something similar to set CSP in prod
// if (process.env.NODE_ENV === "development") {
// 	window.addEventListener("DOMContentLoaded", () => {
// 		document.head
// 			.querySelector('[http-equiv="Content-Security-Policy"]')
// 			?.setAttribute("content", "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; connect-src https://localhost:5001/*");
// 	});
// }

const electronApi: IElectronApi = {
	selectFile: (options: Electron.OpenDialogOptions) => ipcRenderer.invoke("selectFile", options)
};

contextBridge.exposeInMainWorld("electronApi", electronApi);
