import { createContext } from "react";

export const UserContext = createContext<{
  user: string | unknown;
  username: string | unknown;
}>({ user: null, username: null });
