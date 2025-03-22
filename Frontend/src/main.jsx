import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from "react-cookie"; 

import './index.css'
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      {" "}
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>
);
