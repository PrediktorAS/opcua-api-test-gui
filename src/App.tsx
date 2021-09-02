import React from "react";
import { MainScreen } from "./MainScreen";

import { MsalProvider } from "@azure/msal-react";

type Props = {
	pca: any,
};

// {logout()}}
/** */
function App (props: Props) {
	return (
		<MsalProvider instance={props.pca}>
			<MainScreen />
		</MsalProvider>
	);
}

export default App;
