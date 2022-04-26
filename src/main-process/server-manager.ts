import { spawn } from "child_process";
import path from "path";
import { FileContants } from "./models/constants/file-constants";

export class ServerManager {
	public startServer(): void {
		const serverExePath: string = path.resolve(__dirname, FileContants.SERVER_EXE_PATH);
		spawn(serverExePath, { stdio: "ignore" });
	}
}
