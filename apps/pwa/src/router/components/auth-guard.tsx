import { trpcFetch } from "@/trpc/trpcFetch";
import { message } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useUserActions, useUserInfo } from "../../store/userStore";
import { usePathname, useRouter } from "../hooks";

type Props = {
	children: ReactNode;
};

export function AuthGuard({ children }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const userInfo = useUserInfo();
	const { setUserInfo, clearUserInfoAndToken } = useUserActions();
	const [isLoading, setIsLoading] = useState(true);

	const checkIfUserIsLoggedIn = async () => {
		if (pathname === "/auth/login") {
			return setIsLoading(false);
		}
		setIsLoading(true);
		const profile = await trpcFetch.auth.profile.query().catch(() => null);
		if (profile?.user?.id && profile?.user?.email) {
			setUserInfo(profile.user);
			setIsLoading(false);
		} else {
			message.error("You are not authorized. Please login to continue.");
			clearUserInfoAndToken();
			router.push("/auth/login");
		}
	};

	useEffect(() => {
		if (userInfo?.id || userInfo?.email) {
			setIsLoading(false);
		} else {
			checkIfUserIsLoggedIn();
		}
		// using userInfo dependencies throws it into an infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (isLoading) {
		return <SuspenseFallBack />;
	}

	return <>{children}</>;
}
