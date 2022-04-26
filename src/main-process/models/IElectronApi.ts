export interface IElectronApi {
	selectFile(options: Electron.OpenDialogOptions): Promise<string | undefined>;
}
