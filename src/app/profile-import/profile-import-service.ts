import type { IElectronApi } from "@app/core/models/IElectronApi";
import { PIConstants } from "@app/profile-import/models/constants/profile-import-constants";

export class ProfileImportService {
	constructor(private readonly electronApi: IElectronApi) {}

	public async importProfile(): Promise<void> {
		const userProfile = await this.electronApi.getEnvironmentVariable("USERPROFILE");
		const filePath: string | undefined = await this.electronApi.selectFile({
			title: "Select profile",
			defaultPath: `${userProfile}\\Desktop\\Summoners War Exporter Files`
		});

		if (filePath === undefined) {
			return;
		}

		await fetch(`${PIConstants.IMPORT_PROFILE_URL}/${encodeURIComponent(filePath)}`, { method: "POST" });
	}
}
