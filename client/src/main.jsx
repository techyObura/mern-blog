import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persister } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProviders from "./components/ThemeProviders.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PersistGate persistor={persister}>
      <Provider store={store}>
        <ThemeProviders>
          <App />
        </ThemeProviders>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
