import * as signalR from "@microsoft/signalr";

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window { REACT_APP_APIS_HUB: string; }
}

/**
 * Connects to the APIS hub.
 */
export function connectToApisHub (
	handleHubResponse: Function,
	setApisHubConnection: Function,
	messagesVisible: boolean,
	accessToken: string | null
) {
	const transport = signalR.HttpTransportType.WebSockets;
	const options = {
		logMessageContent: false,
		logger: signalR.LogLevel.Warning,
		skipNegotiation: true,
		transport,
		useDefaultPath: false,
	};

	const url = window.REACT_APP_APIS_HUB;
	if (!url) {
		return;
	}

	const newSignalRConnection = new signalR.HubConnectionBuilder()
		.withUrl(url,
			{
				accessTokenFactory: () => {
					return accessToken || "";
				},
				...options,
			}
		)
		.build();

	newSignalRConnection
		.start()
		.then(() => {
			console.info("SignalR connection to Apis Hub established");
		})
		.catch((err) => {
			console.error(err.toString());
		});

	newSignalRConnection.on("HubResponse", (signalRResponsePackage) => {
		handleHubResponse(signalRResponsePackage);
	});

	newSignalRConnection.on("error", (event) => {
		console.error(event);
	});

	setApisHubConnection(newSignalRConnection);
}
