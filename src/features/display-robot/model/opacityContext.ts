import { createContext } from "react";

export interface OpacityContextValue {
  opacity: number;
  setOpacity: (opacity: number) => void;
}

export const OpacityContext = createContext<OpacityContextValue | undefined>(undefined);
