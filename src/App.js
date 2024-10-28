import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { CodegroundScreen } from "./screens/CodegroundScreen";
import { CodegroundProvider } from "./Providers/CodegroundProvider";
import { ModelProvider } from "./Providers/ModelProvider";
import { ThemeProvider } from "./Providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <CodegroundProvider>
        <ModelProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/codeground/:fileId/:folderId" element={<CodegroundScreen />} />
            </Routes>
          </BrowserRouter>
        </ModelProvider>
      </CodegroundProvider>
    </ThemeProvider>
  );
}

export default App;
