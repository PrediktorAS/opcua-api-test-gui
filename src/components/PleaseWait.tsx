import React from "react";

/**
 * Displays the please wait symbol to the user.
 */
export const PleaseWait = () => {
	return (
		<div className="container" style={{ height: "100vh", }}>
			<div className="is-loading" />
		</div>
	);
};
