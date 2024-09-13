// ----------------------------------------------------------------------

import { UserType } from "@repo/utils";


export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserType | null;
};

// ----------------------------------------------------------------------

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserType | null;
  login: () => Promise<void>;
  logout: () => void;
}
