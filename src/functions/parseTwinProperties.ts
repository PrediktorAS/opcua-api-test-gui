import { toCamel } from "./UtilityFunctions";

/**
 * Parses the twin properties sent from the backend into simple properties.
 */
export function parseTwinProperties (data: {
	twinProperties: Array<{
		name: string,
		nodeId: string,
		quality: string,
		timestamp: Date,
		value: number
	}>
}) {
	let properties: any = {};
	let extendedProperties: any = {};

	const { twinProperties, } = data;
	for (let i = 0; i < twinProperties.length; i++) {
		const twinProperty = twinProperties[i];
		const { name, nodeId, quality, timestamp, value, } = twinProperty;

		properties[name] = value;
		extendedProperties[name] = {
			nodeId,
			quality,
			timestamp,
			value,
		};
	}

	properties = toCamel(properties);
	extendedProperties = toCamel(extendedProperties);

	const newData = {
		...data,
		...{
			extendedProperties,
			properties,
		},
	};

	return newData;
}
