// @flow
/**
 * Created by Simon 01.10.2017
 *
 * General functions for simple data processing or routine actions.
 */

/**
 * Converts a rem value to a number of pixels for the current screen size.
 * @param rem The rem value to convert.
 */
export function convertRemToPixels (rem: string | number) {
	if (!rem) {
		rem = "1rem";
	}

	if (typeof rem === "string") {
		if (rem.indexOf("rem") >= 0) {
			rem = rem.substring(0, rem.length - 3);
			rem = parseFloat(rem);
		} else {
			rem = parseFloat(rem);
		}
	}

	if (document.documentElement) {
		const pixels =
            rem *
            parseFloat(getComputedStyle(document.documentElement).fontSize);

		return Math.round(pixels);
	}

	return null;
}

/**
 * Rounds a number up to a given number of decimals.
 * @param {*} input The number to round.
 * @param {*} decimalCount The number of decimals to round the number to.
 */
export function roundNumber (input: number, decimalCount: number) {
	if (isNull(input) || isNull(decimalCount)) {
		return input;
	}

	const power = Math.pow(10, decimalCount);

	const rounded = Math.round(input * power);

	return rounded / power;
}

/**
 * Checks if a value is null, but allows zero or blank.
 * @param value The value to check.
 * @returns {boolean}
 */
export function isNull (value: any): value is null | undefined {
	if (value === null) {
		return true;
	}

	if (value === undefined) {
		return true;
	}

	return false;
}

/**
 * Takes a number and adds a leading zero where necessary to make it two digit.
 * @param {*} digit The number to change.
 */
export function makeTwoDigit (digit: number): string {
	if (!digit) {
		return "00";
	}

	if (digit >= 0) {
		if (digit >= 10) {
			return digit.toString();
		}

		return "0" + digit.toString();
	} else {
		if (digit <= -10) {
			return digit.toString();
		}

		return "-0" + (digit * -1).toString();
	}
}

/**
 * Finds the name of the month.
 */
export function getMonthName (month: number) {
	switch (month) {
		case 0:
			return "January";
		case 1:
			return "February";
		case 2:
			return "March";
		case 3:
			return "April";
		case 4:
			return "May";
		case 5:
			return "June";
		case 6:
			return "July";
		case 7:
			return "August";
		case 8:
			return "September";
		case 9:
			return "October";
		case 10:
			return "November";
		case 11:
			return "December";
		default:
			return "Not Found";
	}
}

/**
 * Gets the two letters to append to the day (st, nd, rd, th)
 */
export function getDayHelper (day: number) {
	if (day === 1 || day === 21 || day === 31) {
		return "st";
	}
	if (day === 2 || day === 22) {
		return "nd";
	}
	if (day === 3 || day === 23) {
		return "rd";
	}

	return "th";
}

/**
 * Gets the value of a signal from an object.
 */
export function getSignalValue (object: object, signal: {
	count: number,
	defaultValue: number,
	signalName: string,
}) {
	if (!object || !signal) {
		return null;
	}

	const {
		count,
		defaultValue,
		signalName,
	} = signal;

	let signalValue = getSignalHierarchy(object, signalName);
	if (isNull(signalValue)) {
		return defaultValue || null;
	}

	if (count) {
		signalValue = signalValue.length;
		return signalValue;
	}

	return signalValue;
}

/**
 * Gets the value of a signal from an object.
 */
export function getSignalUnit (signal: { unit: string }) {
	if (!signal) {
		return null;
	}

	const {
		unit,
	} = signal;

	return unit || null;
}

/**
 * Gets the maximum limit of a signal from an object.
 */
export function getSignalMax (signal: { max: number }) {
	if (!signal) {
		return null;
	}

	const {
		max,
	} = signal;

	return max || 100;
}

/**
 * Gets the minimum limit of a signal from an object.
 */
export function getSignalMin (signal: {min: number}) {
	if (!signal) {
		return null;
	}

	const {
		min,
	} = signal;

	return min || 0;
}

/**
 * Gets the value of a signal from an object.
 */
export function getTrendValue (object: any, signal: {
	defaultValue: number,
	divisor: number,
	name: string,
	numberOfDecimals: number,
}) {
	if (!object || !signal) {
		return null;
	}

	const {
		defaultValue,
		divisor,
		name,
		numberOfDecimals,
	} = signal;

	let signalValue = object[name];
	if (isNull(signalValue)) {
		return defaultValue || null;
	}

	if (divisor) {
		signalValue = parseFloat(signalValue) / divisor;
	}

	if (!isNull(numberOfDecimals)) {
		signalValue = parseFloat(signalValue);
		signalValue = roundNumber(signalValue, numberOfDecimals);
	}

	return signalValue;
}

/**
 * Gets a count of the signals in an array.
 */
export function getSignalCount (object: any, signal: { name: string }) {
	if (!object || !signal) {
		return 0;
	}

	const {
		name,
	} = signal;

	const signalValue = getSignalHierarchy(object, name);
	if (isNull(signalValue)) {
		return 0;
	}

	return signalValue.length;
}

/**
 * Gets a signal that may contain dots for the hierarchy.
 */
export function getSignalHierarchy (object: any, signalName: string) {
	if (!object || !signalName) {
		return null;
	}

	const names = signalName.split(".");

	let result = object;
	for (let i = 0; i < names.length; i++) {
		const name = names[i];
		if (result && !isNull(result[name])) {
			result = result[name];
		} else {
			result = null;
		}
	}

	return result;
}

/**
 * Generates a GUID.
 */
export function getGUID () {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = Math.random() * 16 | 0; const v = c === "x" ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/** Get time (UTC) or Localtime (returns: HH:MM) */
export function getTime (utcOffset: number, localTime = false) {
	if (!utcOffset) {
		utcOffset = 0;
	}
	let hours: number | string = "00";
	let minutes: number | string = "00";
	const currentdate = new Date();

	if (localTime) {
		hours = currentdate.getHours();
		// minutes are the same on every time zone
		minutes = currentdate.getMinutes();
	} else {
		hours = currentdate.getUTCHours() + utcOffset;
		// minutes are the same on every time zone
		minutes = currentdate.getUTCMinutes();
	}

	// correct for number over 24, and negatives
	if (hours >= 24) { hours -= 24; }
	if (hours < 0) { hours += 12; }

	// add leading zero, first convert hours to string
	hours = hours + "";
	if (hours.length === 1) { hours = "0" + hours; }

	// add leading zero, first convert hours to string
	minutes = minutes + "";
	if (minutes.length === 1) { minutes = "0" + minutes; }

	return hours + ":" + minutes;
}

/**
 * Checks if a value is a number.
 * @param n The value to check.
 * @returns {boolean}
 */
export function isNumber (n: any) {
	if (typeof n !== "number") {
		return false;
	}

	return !isNaN(Number(n)) && isFinite(n);
}

/**
 * Converts an object to camel case.
 */
export function toCamel (o: any): any {
	let newO: any, origKey, newKey, value;
	if (o instanceof Array) {
		return o.map(function (value) {
			if (typeof value === "object") {
				value = toCamel(value);
			}
			return value;
		});
	} else {
		newO = {};
		for (origKey in o) {
			// eslint-disable-next-line no-prototype-builtins
			if (o.hasOwnProperty(origKey)) {
				newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
				value = o[origKey];
				if (value) {
					if (value instanceof Array || (value !== null && value.constructor === Object)) {
						value = toCamel(value);
					}
				}
				newO[newKey] = value;
			}
		}
	}
	return newO;
}

/**
 * Converts a word to camel case.
 */
export function toCamelWord (o: string): string {
	return (o.charAt(0).toLowerCase() + o.slice(1)).toString();
}

/**
 * Converts an object to Pascal case.
 */
export function toPascal (o: any): any {
	let newO: any, origKey, newKey, value;
	if (o instanceof Array) {
		return o.map(function (value) {
			if (typeof value === "object") {
				value = toPascal(value);
			}
			return value;
		});
	} else {
		newO = {};
		for (origKey in o) {
			// eslint-disable-next-line no-prototype-builtins
			if (o.hasOwnProperty(origKey)) {
				newKey = (origKey.charAt(0).toUpperCase() + origKey.slice(1) || origKey).toString();
				value = o[origKey];
				if (value) {
					if (value instanceof Array || (value !== null && value.constructor === Object)) {
						value = toPascal(value);
					}
				}
				newO[newKey] = value;
			}
		}
	}
	return newO;
}
