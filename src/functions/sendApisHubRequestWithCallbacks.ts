import { toPascal } from "./../functions/UtilityFunctions";
import { SignalRRequestPackageType } from "./../Types";

/**
 * Sends a request to the APIS hub.
 */
export function sendApisHubRequestWithCallbacks (
	signalRRequestPackage: SignalRRequestPackageType,
	apisHubConnection: any,
	messagesVisible: Boolean
) {
	const { requestId, requestType, parameters, } = signalRRequestPackage;
	if (!requestId) {
		return;
	}

	const pascalParamerters = toPascal(parameters);
	const json = JSON.stringify(pascalParamerters);
	const signalRRequest = {
		json,
		requestId,
		requestType,
	};

	if (apisHubConnection?.connectionState === "Connected") {
		apisHubConnection
			.invoke("TransactionRequest", signalRRequest)
			.catch(function (err: Object) {
				console.error(err.toString());
			});
	} else if (apisHubConnection?.connectionState === "Disconnected") {
		apisHubConnection
			.start()
			.then(() => {
				apisHubConnection
					.invoke("TransactionRequest", signalRRequest)
					.catch(function (err: Object) {
						console.error(err.toString());
					});
			})
			.catch((err: Object) => {
				console.error(err.toString());
			});
	} else {
	/**
	 * Retries the connection, if it doesn't succeed at once.
	 */
		const retry = (attempts: number) => {
			if (apisHubConnection?.connectionState === "Connected") {
				apisHubConnection
					.invoke("TransactionRequest", signalRRequest)
					.catch(function (err: Object) {
						console.error(err.toString());
					});
			} else {
				const currentDate = new Date();

				console.info(currentDate.toISOString() +
					": Apis Hub is currently " + apisHubConnection?.connectionState);
				console.info(
					currentDate.toISOString() +
					": Connection to the Apis OPC UA server not available. Retry attempt: " +
					attempts
				);
				if (attempts < 10) {
					const timeToWait = attempts * 250;

					setTimeout(() => {
						retry(attempts + 1);
					}, timeToWait);
				} else {
					console.error(
						"A connection to the Apis OPC UA server isn't available. Please try again later."
					);
				}
			}
		};

		// If it didn't work first time, wait and try again.
		setTimeout(() => {
			retry(1);
		},
		250
		);
	}
}
