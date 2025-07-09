import { Routes, Route } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import StatsPage from "./components/StatsPage";
import RedirectPage from "./components/RedirectPage";
import './index.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShortenerForm />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/r/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;
