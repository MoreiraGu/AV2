import Router from "./routes/Router";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
