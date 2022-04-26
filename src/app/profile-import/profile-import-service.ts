import type { IElectronApi } from "@app/core/models/IElectronApi";
import { PIConstants } from "@app/profile-import/models/constants/profile-import-constants";

export class ProfileImportService {
	constructor(private readonly electronApi: IElectronApi) {}

	public async importProfile(): Promise<void> {
		const filePath: string | undefined = await this.electronApi.selectFile({
			title: "Select profile",
			// Todo this doesn't work
			defaultPath: "%userprofile%/Desktop/Summoners War Exporter Files"
		});

		if (filePath === undefined) {
			return;
		}

		await fetch(`${PIConstants.IMPORT_PROFILE_URL}/${encodeURIComponent(filePath)}`, { method: "POST" });
	}
}
