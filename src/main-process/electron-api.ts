import type { IElectronApi } from "@main-process/models/IElectronApi";
import { dialog, ipcMain } from "electron";

export class ElectronApi implements IElectronApi {
	public addIpcHandlers(): void {
		ipcMain.handle("selectFile", (ipcEvent: Electron.IpcMainInvokeEvent, options: Electron.OpenDialogOptions) => this.selectFile(options));
	}

	public async selectFile(options: Electron.OpenDialogOptions): Promise<string | undefined> {
		const result: Electron.OpenDialogReturnValue = await dialog.showOpenDialog(options);

		if (result.canceled) {
			return undefined;
		}

		return result.filePaths[0];
	}
}
