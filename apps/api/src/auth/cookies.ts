// https://stackoverflow.com/questions/60130416/which-is-more-secure-for-a-cookie-host-prefix-or-setting-the-domain

import { env } from "../configs/env.config";

export const USER_TOKEN =
	env.ENVIRONMENT === 'prod' ? '__Host-userToken' : 'userToken'
