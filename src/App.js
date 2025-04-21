import "./App.css";
import { MainPage } from "./pages";
import config from "./config.js";

const theme = config.theme;

function App() {
  return (
    <div className="App" style={{ background: theme && theme.background }}>
      <MainPage />
    </div>
  );
}

export default App;
