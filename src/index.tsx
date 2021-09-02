import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter as Router } from "react-router-dom";

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
		REACT_APP_BASE_NAME: string;
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Router basename={window.REACT_APP_BASE_NAME || undefined}>
			<App pca={msalInstance} />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
