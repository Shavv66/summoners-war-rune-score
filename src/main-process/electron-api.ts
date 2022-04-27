import type { IElectronApi } from "@main-process/models/IElectronApi";
import { dialog, ipcMain } from "electron";

export class ElectronApi implements IElectronApi {
	public addIpcHandlers(): void {
		ipcMain.handle("selectFile", (ipcEvent: Electron.IpcMainInvokeEvent, options: Electron.OpenDialogOptions) => this.selectFile(options));
		ipcMain.handle("getEnvironmentVariable", (ipcEvent: Electron.IpcMainInvokeEvent, variableName: string) => this.getEnvironmentVariable(variableName));
	}

	public async selectFile(options: Electron.OpenDialogOptions): Promise<string | undefined> {
		const result: Electron.OpenDialogReturnValue = await dialog.showOpenDialog(options);

		if (result.canceled) {
			return undefined;
		}

		return result.filePaths[0];
	}

	public async getEnvironmentVariable(variableName: string): Promise<string | undefined> {
		return Promise.resolve(process.env[variableName]);
	}
}
