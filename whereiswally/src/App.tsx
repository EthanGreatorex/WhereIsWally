import Home from "./pages/home";
import Game from "./pages/game";
import Snowfall from "./components/Snowfall";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Snowfall count={120} />
      <div className="app-root" style={{ position: 'relative', zIndex: 1 }}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/games/:id" element={<Game />}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
