import { useContext } from "react";
import { OpacityContext } from "./opacityContext";

export const useOpacity = () => {
  const context = useContext(OpacityContext);
  return context;
};
