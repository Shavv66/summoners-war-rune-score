const { mkdirSync, cpSync, rmSync } = require("fs");
const path = require("path");

module.exports = {
	packagerConfig: {},
	makers: [
		{
			name: "@electron-forge/maker-squirrel",
			config: {
				name: "summoners-war-rune-score"
			}
		},
		{
			name: "@electron-forge/maker-zip",
			platforms: ["darwin"]
		},
		{
			name: "@electron-forge/maker-deb",
			config: {}
		},
		{
			name: "@electron-forge/maker-rpm",
			config: {}
		}
	],
	plugins: [
		[
			"@electron-forge/plugin-webpack",
			{
				mainConfig: "./webpack.main.config.js",
				renderer: {
					config: "./webpack.renderer.config.js",
					entryPoints: [
						{
							html: "./src/index.html",
							js: "./src/renderer.ts",
							name: "main_window",
							preload: {
								js: "./src/preload.ts"
							}
						}
					]
				},
				devContentSecurityPolicy: "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; connect-src 'self' 'unsafe-inline' https://localhost:5001 data:",
				port: 3073,
				loggerPort: 9073
			}
		]
	],
	hooks: {
		generateAssets: () => {
			// Todo build server here
		},
		postStart: () => {
			const webpackOutputServerBinPath = path.resolve(__dirname, ".webpack/main/server/bin/Release");
			rmSync(webpackOutputServerBinPath, { recursive: true, force: true });
			mkdirSync(webpackOutputServerBinPath, { recursive: true, force: true });
			
			const realServerBinPath = path.resolve(__dirname, "src/server/bin/Release");
			cpSync(realServerBinPath, webpackOutputServerBinPath, { recursive: true, force: true });
		}
	}
};
