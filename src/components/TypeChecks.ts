import * as go from "gojs";

/**
 * Is the part selected a node?
 */
export function showIfNode (part: any) { return part instanceof go.Node; };

/**
 * Is the part selected a link?
 */
export function showIfLink (part: any) { return part instanceof go.Link; };

/**
 * Is the part selected a group?
 */
export function showIfGroup (part: any) { return part instanceof go.Group; };

/**
 * Only show the property if its present. Useful for "key" which will be shown on Nodes and Groups, but normally not on Links
 */
export function showIfPresent (data: any, propname: string) {
	if (data instanceof go.Part) data = data.data;
	return typeof data === "object" && data[propname] !== undefined;
};
