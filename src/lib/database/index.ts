import { connect, disconnect } from "mongoose";

if (!import.meta.env.ERICA_MONGO) {
	throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = import.meta.env.ERICA_MONGO;
let isConnected = false;

export function connectToDatabase() {
	if (isConnected) return;

	connect(uri)
		.then((db) => {
			isConnected = db.connections[0].readyState === 1;
		})
		.catch((e) => {
			console.error(
				"Catched a fatal error caused by MongoDB connection:"
			);
			console.error(e);
			process.exit(0);
		});
}

export function disconnectFromDatabase() {
	isConnected = false;
	return disconnect();
}
