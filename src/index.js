import React from "react";
import ReactDOM from "react-dom";
import "./fonts/stylesheet.css";
import "./scss/style.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MoralisProvider
        serverUrl="https://t1dgflyg2uft.bigmoralis.com:2053/server"
        appId="q6NZenv0ACYx24jH2tfz1ZrQSNhyLRUqDmofDy3f"
      >
        <App />
      </MoralisProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
