<script setup lang="ts">
	import { provideServices } from "@app/core/service-container";

	const { profileImportService } = provideServices();

	async function importProfile() {
		await profileImportService.importProfile();
	}
</script>

<template>
	<button @click="importProfile">Import Profile</button>
</template>
