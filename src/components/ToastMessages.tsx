import React, { useEffect } from "react";
import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
	messages: Array<{
		datetime: Date,
		message: string,
		type: TypeOptions,
	}>,
}

/**
 * Displays toast messages to the user.
 */
export const ToastMessages = (props: Props) => {
	const {
		messages,
	} = props;

	useEffect(() => {
		if (messages && messages.length > 0) {
			const currentDate = new Date();
			currentDate.setSeconds(currentDate.getSeconds() - 1);
			const lastMessage = messages[messages.length - 1];
			const messageTime = new Date(lastMessage.datetime);

			if (messageTime > currentDate) {
				toast(lastMessage.message, {
					type: lastMessage.type,
				});
			}
		}
	}, [ messages ]);

	return (
		<ToastContainer
			position="bottom-center"
		/>
	);
};
