import { toCamel } from "../functions/UtilityFunctions";
import { parseTwinProperties } from "../functions/parseTwinProperties";
import { SignalRResponsePackageType } from "../Types";

/**
 * Called when the Backend Hub sends a message.
 */
export function handleHubResponseWithCallbacks (
	signalRResponsePackage: SignalRResponsePackageType,
	callbacks: any,
	messagesVisible: Boolean,
	handleSubscribeResponse: Function
) {
	const { errorMessages, requestId, } = signalRResponsePackage;

	if (errorMessages.length > 0) {
		for (let i = 0; i < errorMessages.length; i++) {
			console.error(errorMessages[i]);

			if (errorMessages[i].indexOf("<!DOCTYPE html PUBLIC") >= 0 ||
				errorMessages[i].indexOf("The operation was canceled") >= 0 ||
				errorMessages[i].indexOf("Error establing a connection") >= 0 ||
				errorMessages[i].indexOf("Connection to the Backend API was lost") >= 0) {
				if (messagesVisible) {
					// dispatch(
					// 	AddMessage({
					// 		message: "Connection to the backend has been lost. Refreshing the page...",
					// 		type: "warning",
					// 	})
					// );
				}

				setTimeout(() => {
					location.reload(true);
				}, 5000);
			} else {
				if (messagesVisible) {
					// dispatch(
					// 	AddMessage({
					// 		message: errorMessages[i],
					// 		type: "error",
					// 	})
					// );
				}
			}
		}
	} else {
		const data = JSON.parse(signalRResponsePackage.json);
		let camelData = toCamel(data);

		if (!requestId) {
			// Since this data hasn't been requested, it's likely a subscribed value.
			handleSubscribeResponse(camelData);
			return;
		}

		if (callbacks[requestId]?.onSuccess) {
			if (camelData?.twinProperties) {
				camelData = parseTwinProperties(camelData);
			}

			if (Array.isArray(camelData)) {
				for (let i = 0; i < camelData.length; i++) {
					if (camelData[i]?.twinProperties) {
						camelData[i] = parseTwinProperties(camelData[i]);
					}
				}
			}

			callbacks[requestId].onSuccess(camelData);
		}
	}
}
