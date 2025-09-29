import { useContext } from "react";
import { OpacityContext } from "./opacityContext";

export const useOpacity = () => {
  const context = useContext(OpacityContext);
  if (!context) throw Error("Opacity context not found");

  return context;
};
