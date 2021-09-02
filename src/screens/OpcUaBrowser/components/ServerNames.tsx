import React, { useState } from "react";
import { RootNode } from "./RootNode";

type Props = {
	onSelect: Function,
	serverNames: Array<string>,
}

/**
 * Displays a selectable list of the available server names.
 */
export const ServerNames = (props: Props) => {
	const {
		onSelect,
		serverNames,
	} = props;
	const [ selectedServer, setSelectedServer ] = useState<string | null>(null);
	const [ activeLevel, setActiveLevel ] = useState(0);

	/**
	 * Called when the user clicks on a server.
	 */
	function handleServerClick (serverName: string) {
		setActiveLevel(1);
		setSelectedServer(serverName);
	}

	/**
	 * Displays a row for each server.
	 */
	function eachServer (item: string, index: number) {
		return (
			<div
				key={index}
				onClick={(event) => {
					handleServerClick(item);
				}}
				style={{
					cursor: "pointer",
				}}
			>
				{item}
			</div>
		);
	}

	return (
		<div className="browsable-tree">
			<div
				style={{
					height: "100%",
					opacity: 0.3,
					position: "absolute",
					width: "100%",
					zIndex: 0,
				}}
			/>
			<div
				style={{
					boxSizing: "border-box",
					height: "100%",
					paddingLeft: 3,
					position: "absolute",
					width: "100%",
					zIndex: 1,
				}}
			>
				{!selectedServer && serverNames && serverNames.length > 0 && serverNames.map(eachServer)}
				{selectedServer &&
					<RootNode
						activeLevel={activeLevel}
						currentLevel={1}
						levelList={[ {
							level: 0,
							name: "Home",
						} ]}
						onHome={() => { setSelectedServer(null); }}
						onReset={() => { setSelectedServer(null); }}
						onSelect={(nodeId: string) => { onSelect(nodeId, selectedServer); }}
						onSetLevel={(newLevel: number) => {
							setActiveLevel(newLevel);
							if (newLevel <= 1) {
								setSelectedServer(null);
							}
						}}
						serverName={selectedServer}
						setActiveLevel={setActiveLevel}
					/>}
			</div>
		</div>
	);
};
