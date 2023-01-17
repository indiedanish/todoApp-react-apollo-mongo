// import './App.css';
import NavBar from "./components/NavBar";
import { routes } from "./routes";
import { useRoutes } from "react-router";

function App() {
  const element = useRoutes(routes);
  return (
    <div className="main">
      <NavBar />
      {element}
    </div>
  );
}

export default App;
