import { useState } from "react";
import { OpacityContext } from "../../../features/display-robot/model";
import { DEFAULT_BOT_PERCENT } from "../../../shared/config";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState<number>(DEFAULT_BOT_PERCENT);

  return <OpacityContext value={{ opacity, setOpacity }}>{children}</OpacityContext>;
}
