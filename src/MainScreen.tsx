import React, { useEffect, useState } from "react";
import "./App.css";
import { OpcUaBrowser } from "./screens/OpcUaBrowser/OpcUaBrowser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { HubContextType, SignalRRequestPackageType, SignalRResponsePackageType } from "./Types";
import { ToastMessages } from "./components/ToastMessages";
import { loginRequest } from "./authConfig";
import { PleaseWait } from "./components/PleaseWait";
import { sendApisHubRequestWithCallbacks } from "./functions/sendApisHubRequestWithCallbacks";
import { connectToApisHub } from "./functions/connectToApisHub";
import { handleHubResponseWithCallbacks } from "./functions/handleHubResponseWithCallbacks";

export const HubContext = React.createContext<HubContextType>({
	sendApisHubRequest: () => {},
});

/**
 * The app.
 */
export function MainScreen () {
	const { instance, accounts, inProgress, } = useMsal();
	const [ accessToken, setAccessToken ] = useState<string | null>(null);
	const [ apisHubConnection, setApisHubConnection ] = useState(null);
	const [ callbacks, setCallbacks ] = useState<any>({});
	const [ messagesVisible ] = useState(false);

	useEffect(() => {
		if (inProgress === "none" && accounts.length > 0) {
			/** Retrieve an access token */
			const fetchAccessToken = async () => {
				instance.acquireTokenSilent({
					account: accounts[0],
					scopes: loginRequest.scopes,
				}).then((response: any) => {
					if (response.accessToken) {
						setAccessToken(response.accessToken);
					}
					return null;
				});
			};

			fetchAccessToken();
		}
	}, [ inProgress, accounts, instance ]);

	useEffect(() => {
		if (accessToken || !window.REACT_APP_AAD_AUTHORITY) {
			connectToApisHub(handleHubResponse, setApisHubConnection, messagesVisible, accessToken);
		}
	}, [ accessToken ]);

	/**
	 * Called when the Backend Hub sends a message.
	 */
	function handleHubResponse (signalRResponsePackage: SignalRResponsePackageType) {
		handleHubResponseWithCallbacks(signalRResponsePackage, callbacks, messagesVisible, () => {});
	}

	/**
	 * Sends a request to the backend API.
	 */
	function sendApisHubRequest (signalRRequestPackage: SignalRRequestPackageType) {
		const { requestId, onSuccess, } = signalRRequestPackage;
		if (requestId && onSuccess) {
			const newCallbacks = callbacks;
			newCallbacks[requestId] = {
				onSuccess,
			};

			setCallbacks(newCallbacks);
		}

		sendApisHubRequestWithCallbacks(signalRRequestPackage, apisHubConnection, messagesVisible);
	}

	if (!apisHubConnection && (accounts.length > 0 || !window.REACT_APP_AAD_AUTHORITY)) {
		return (
			<PleaseWait />
		);
	}

	const hubContextPackage = {
		apisHubConnection,
		sendApisHubRequest,
	};

	if (!window.REACT_APP_AAD_AUTHORITY) {
		return (
			<HubContext.Provider
				value={hubContextPackage}
			>
				<OpcUaBrowser />
				<ToastMessages messages={[]} />
			</HubContext.Provider>
		);
	}

	return (
		<>
			<AuthenticatedTemplate>
				<HubContext.Provider
					value={hubContextPackage}
				>
					<OpcUaBrowser />
					<ToastMessages messages={[]} />
				</HubContext.Provider>
			</AuthenticatedTemplate>
			<UnauthenticatedTemplate>
				<HubContext.Provider
					value={hubContextPackage}
				>
					<div>Not logged in</div>
					<ToastMessages messages={[]} />
				</HubContext.Provider>
			</UnauthenticatedTemplate>
		</>
	);
}
