import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import PhoneLogIn from "./pages/PhoneLogIn";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./context/UserContext";
import RefralPage from "./pages/RefralPage";
import Address from './pages/AddressPage'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route>
            <Route index element={<App />} />
            <Route path="/address" element={<Address />} />
            <Route path="/login/:refralCode?" element={<PhoneLogIn />} />
            <Route path="/refralPage" element={<RefralPage />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
