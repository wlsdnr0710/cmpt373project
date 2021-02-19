import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import PageTemplate from "./containers/PageTemplate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PageTemplate>
          <Router />
        </PageTemplate>
      </BrowserRouter>
    </div>
  );
}

export default App;
