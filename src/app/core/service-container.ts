import type { IElectronApi } from "@app/core/models/IElectronApi";
import type { IServiceContainer } from "@app/core/models/IServiceContainer";
import { ProfileImportService } from "@app/profile-import/profile-import-service";
import { inject, provide, type InjectionKey } from "vue";

const key = Symbol() as InjectionKey<IServiceContainer>;

const electronApi: IElectronApi = window.electronApi;
const profileImportService = new ProfileImportService(electronApi);

const serviceContainer: IServiceContainer = {
	electronApi,
	profileImportService
};

export function provideServices(): IServiceContainer {
	provide(key, serviceContainer);

	return serviceContainer;
}

export function getServices(): IServiceContainer {
	const services: IServiceContainer | undefined = inject(key);

	if (services === undefined) {
		throw Error("Failed to inject services as they were undefined");
	}

	return services;
}
