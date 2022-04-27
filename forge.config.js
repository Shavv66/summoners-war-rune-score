const { exec } = require("child_process");
const { mkdirSync, cpSync, rmSync, existsSync } = require("fs");
const path = require("path");

function importServer(basePath) {
	if (basePath === undefined) {
		basePath = __dirname;
	}

	const serverBinPath = path.resolve(__dirname, "src/server/bin/Release/net6.0/win-x64/publish");
	const outputPath = path.resolve(basePath, ".webpack/main/server");

	console.log(`\nImporting server from '${serverBinPath}' to '${outputPath}'`);

	cpSync(serverBinPath, outputPath, { recursive: true, force: true });
}

function handleExecOutput(actionName, error, stdout, stderr) {
	if (stdout !== undefined && stdout.length > 0) {
		console.log(`\n${actionName} output: ${stdout}`);
	}
	if (stderr !== undefined && stderr.length > 0) {
		console.log(`${actionName} stderr: ${stderr}`);
	}
	if (error !== null) {
		console.log(`${actionName} error: ${error}`);
	}
}

module.exports = {
	packagerConfig: {
		afterCopy: [
			(buildPath, electronVersion, platform, arch, done) => {
				importServer(buildPath);
				done();
			}
		]
	},
	makers: [
		// {
		// 	name: "@electron-forge/maker-squirrel",
		// 	config: {
		// 		name: "Summoners War Rune Score"
		// 	}
		// },
		// {
		// 	name: "@electron-forge/maker-zip"
		// },
		// {
		// 	name: "@electron-forge/maker-wix",
		// 	config: {
		// 		ui: {
		// 			chooseDirectory: true
		// 		}
		// 	}
		// },
		// {
		// 	name: "@electron-forge/maker-deb",
		// 	config: {}
		// },
		// {
		// 	name: "@electron-forge/maker-rpm",
		// 	config: {}
		// }
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
				devContentSecurityPolicy:
					"default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:; connect-src 'self' 'unsafe-inline' https://localhost:5001 data:",
				port: 3073,
				loggerPort: 9073
			}
		]
	],
	hooks: {
		generateAssets: async () => {
			const publishServerBatPath = path.resolve(__dirname, "src/server/Publish.bat");
			console.log(`Running ${publishServerBatPath}`);
			await new Promise((resolve) => {
				exec(`cmd /c "${publishServerBatPath}"`, (error, stdout, stderr) => {
					handleExecOutput("Publish", error, stdout, stderr);

					resolve();
				});
			});
		},
		postStart: () => {
			const webpackOutputServerPath = path.resolve(__dirname, ".webpack/main/server");
			console.log(`Recreating '${webpackOutputServerPath}'`);
			rmSync(webpackOutputServerPath, { recursive: true, force: true });
			mkdirSync(webpackOutputServerPath, { recursive: true, force: true });

			importServer();
		},
		postPackage: async () => {
			const innoCompilerPath = path.resolve(process.env["PROGRAMFILES(X86)"], "Inno Setup 6/ISCC.exe");
			if (!existsSync(innoCompilerPath)) {
				console.log("Unable to create installer because Inno Setup 6.x is not installed");
				return;
			}

			const command = `"${innoCompilerPath}" "${path.resolve(__dirname, "CreateInstaller.iss")}"`;
			console.log(`\nRunning ${command}`);
			await new Promise((resolve) => {
				exec(command, (error, stdout, stderr) => {
					handleExecOutput("Create Installer", error, stdout, stderr);

					resolve();
				});
			});
		}
	}
};
