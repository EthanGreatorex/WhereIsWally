import Home from "./pages/home";
import Snowfall from "./components/Snowfall";

function App() {
  return (
    <>
      <Snowfall count={120} />
      <div className="app-root" style={{ position: 'relative', zIndex: 1 }}>
        <Home></Home>
      </div>
    </>
  );
}

export default App;
