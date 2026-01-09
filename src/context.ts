import { createContext, useContext } from "react";

export const MobileContext = createContext<boolean | undefined>(undefined);

export function useUserContext() {
  const isMobileWidth = useContext(MobileContext);

  if (isMobileWidth === undefined) {
    throw new Error("Use with MobileContext");
  }

  return isMobileWidth;
}
