export interface IElectronApi {
	selectFile(options: Electron.OpenDialogOptions): Promise<string | undefined>;
	getEnvironmentVariable(variableName: string): Promise<string | undefined>;
}
