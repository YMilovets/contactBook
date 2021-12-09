import Sign from "./components/sign/sign";
import Contact from './components/contact/contact';
import "./components/sign/sign.scss"
import "./less/reset.scss"
import "./less/styles.scss"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux"
import reducer from "./reducer/reducer";
import Layout from "./components/layout";

import { Suspense } from "react";
const store = createStore(reducer)

function App() {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={ <Layout /> }>
                <Route path="sign" element={ <Sign /> } />
                <Route path="contact" element={ <Contact /> } />
              </Route>
            </Routes>
          </Router>
        </div>
      </Provider>
    </Suspense>
  );
}

export default App;