import { RESULTS_FILE, WRITE_TO_TXT } from '../entry';
import * as fs from 'fs';

let logStream: fs.WriteStream | null = null;

export const log = {
	line: (msg: string = '') => {
		console.log(msg);
		if (logStream && WRITE_TO_TXT) logStream.write(msg + '\n');
	},
	start: () => {
		logStream = fs.createWriteStream(RESULTS_FILE, { flags: 'a' });
	},
	close: () => {
		if (logStream) {
			logStream.end();
			logStream = null;
		}
	},
};