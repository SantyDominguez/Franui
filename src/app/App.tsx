import { AppRouter } from "./router";
import { AppProviders } from "./providers";
import "../App.css";

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
