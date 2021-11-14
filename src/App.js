import Sign from "./components/sign/sign";
import Contact from './components/contact/contact';
import "./components/sign/sign.scss"
import "./components/sign/reset.scss"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sign" exact element={ <Sign /> } />
          <Route path="/contact" exact element={ <Contact /> } />
          <Route path="/" element={<Navigate to="/contact" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
