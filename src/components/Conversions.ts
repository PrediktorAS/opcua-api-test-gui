import * as go from "gojs";

/**
* @ignore
* HTML5 color input will only take hex,
* so var HTML5 canvas convert the color into hex format.
* This converts "rgb(255, 0, 0)" into "#FF0000", etc.
* @param {string} propertyValue
* @return {string}
*/
export function convertToColor (propertyValue: any): string | null {
	const ctx = document.createElement("canvas").getContext("2d");
	if (ctx) {
		ctx.fillStyle = propertyValue;
		return ctx.fillStyle.toString();
	}

	return null;
}

/**
* @ignore
* @param {string}
* @return {Array.<number>}
*/
export function convertToArrayOfNumber (propertyValue: any): Array<number> | null {
	if (propertyValue === "null") return null;
	const split = propertyValue.split(" ");
	const arr = [];
	for (let i = 0; i < split.length; i++) {
		const str = split[i];
		if (!str) continue;
		arr.push(parseFloat(str));
	}
	return arr;
}

/**
* @ignore
* @param {*}
* @return {string}
*/
export function convertToString (x: any): string {
	if (x === undefined) return "undefined";
	if (x === null) return "null";
	if (x instanceof go.Point) return go.Point.stringify(x);
	if (x instanceof go.Size) return go.Size.stringify(x);
	if (x instanceof go.Rect) return go.Rect.stringify(x);
	if (x instanceof go.Spot) return go.Spot.stringify(x);
	if (x instanceof go.Margin) return go.Margin.stringify(x);
	if (x instanceof go.List) return convertToString(x.toArray());
	if (Array.isArray(x)) {
		let str = "";
		for (let i = 0; i < x.length; i++) {
			if (i > 0) str += " ";
			const v = x[i];
			str += convertToString(v);
		}
		return str;
	}
	return x.toString();
}
