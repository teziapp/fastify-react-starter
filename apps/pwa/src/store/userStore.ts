import { App } from "antd";
import { useCallback } from "react";
import { create } from "zustand";

import { UserInfo, UserToken } from "../types/entity";
import { getItem, removeItem, setItem } from "../utils/storage";
import { StorageEnum } from "../types/enum";

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  // const navigatge = useNavigate();
  const { notification, message } = App.useApp();
  // const { setUserToken, setUserInfo } = useUserActions();

  // const signInMutation = useMutation(userService.signin);

  const signIn = async (data: { email: string; password: string }) => {
    try {
      console.log(data);
      // const res = await signInMutation.mutateAsync(data);
      // const { user, accessToken, refreshToken } = res;
      // setUserToken({ accessToken, refreshToken });
      // setUserInfo(user);
      // navigatge(HOMEPAGE, { replace: true });
    } catch (err) {
      message.warning({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        content: err.message,
        duration: 3,
      });
    } finally {
      notification.success({
        message: "sys.login.loginSuccessTitle",
        description: "sys.login.loginSuccessDesc",
        duration: 3,
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(signIn, []);
};
