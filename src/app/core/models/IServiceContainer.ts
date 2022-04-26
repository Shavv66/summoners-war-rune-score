import type { IElectronApi } from "@app/core/models/IElectronApi";
import type { ProfileImportService } from "@app/profile-import/profile-import-service";

export interface IServiceContainer {
	electronApi: IElectronApi;
	profileImportService: ProfileImportService;
}
