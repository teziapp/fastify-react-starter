import { createSigner, createVerifier } from "fast-jwt";
import z from "zod";
import { logger } from "../app";

export const createToken = <T extends object>(params: T, secret: string): string => {
	const signSync = createSigner({
		key: secret,
	});
	const token = signSync(params);

	return token;
};

export const parseToken = <T extends z.ZodType>({
	secret,
	token,
	validator,
}: {
	secret: string;
	token: string | undefined;
	validator?: T;
}) => {
	if (!token) {
		return null;
	}
	try {
		const verify = createVerifier({
			ignoreExpiration: true,
			key: secret,
		});
		let payload: z.infer<T> = validator ? validator.parse(verify(token)) : verify(token);
		return payload;
	} catch (error) {
		if (error instanceof Error) {
			logger.error(`Couldn't parse user token: ${error.message}.\nToken:${token}`);
		}
		return null;
	}
};
