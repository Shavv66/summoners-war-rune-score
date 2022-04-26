import type { IElectronApi } from "@app/core/models/IElectronApi";

declare global {
	interface Window {
		electronApi: IElectronApi;
	}
}
