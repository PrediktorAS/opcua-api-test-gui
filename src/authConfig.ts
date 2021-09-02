declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
		REACT_APP_AAD_AUTHORITY: string;
		REACT_APP_AAD_CLIENT: string;
		REACT_APP_AAD_API: string;
	}
}

// Config object to be passed to Msal on creation
export const msalConfig = {
	auth: {
		authority: window.REACT_APP_AAD_AUTHORITY,
		clientId: window.REACT_APP_AAD_CLIENT,
		postLogoutRedirectUri: window.location.origin,
		redirectUri: window.location.origin,
	},
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
	scopes: [ "profile", window.REACT_APP_AAD_API ],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
	graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
