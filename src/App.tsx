import { Canvas } from "./components/Canvas";
import { ControlProvider } from "./Services/ControlDataContext";

function App() {
  return (
    <ControlProvider>
      <Canvas />
    </ControlProvider>
  );
}

export default App;
