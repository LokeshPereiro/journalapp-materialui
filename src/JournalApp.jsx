import { AppRouter } from "./router/AppRouter";
import { ThemeApp } from "./theme";

export const JournalApp = () => {
  return (
    <ThemeApp>
      <AppRouter />
    </ThemeApp>
  );
};
