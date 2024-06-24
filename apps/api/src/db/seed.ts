import { db } from "./db.config";

export const seed = async () => {
	// create records here

	await db.$close();
};
