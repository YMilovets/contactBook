import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "../Models/reducer";

import Layout from "../Components/Layout";

import styles from "./App.module.scss";
import "./styles.scss";

const Sign = lazy(() => import("../Components/Sign"));
const Contact = lazy(() => import("../Components/Contact"));

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="sign" element={<Sign />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
