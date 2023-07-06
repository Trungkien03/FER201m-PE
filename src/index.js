import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StaffProvider from "./staffs/StaffContext";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ToastProvider from "./components/ToastProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ToastProvider>
    <StaffProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StaffProvider>
  </ToastProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
