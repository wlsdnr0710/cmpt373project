import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
