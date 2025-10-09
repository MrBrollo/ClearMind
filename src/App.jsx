import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;