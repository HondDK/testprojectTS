import MainPage from "./pages/MainPage";
import React from "react";
import FormPage from "./pages/FormPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestPage from "./pages/TestPage";
import ResultsTest from "./pages/ResultsTest";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "../src/redux/store/store";
import "./style/style.scss";

function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/form/:uuid" element={<FormPage />} />
            <Route path="/test_page/:uuid" element={<TestPage />} />
            <Route path="/results_test/:uuid" element={<ResultsTest />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
