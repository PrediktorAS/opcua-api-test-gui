import React, { useContext, useEffect, useState } from "react";
import { HubContext } from "../../../MainScreen";
import { UANode } from "./UANode";

type Props ={
	activeLevel: number,
	currentLevel: number,
	levelList: Array<{
		name: string,
		level: number,
	}>,
	onHome: Function,
	onReset: Function,
	onSelect: Function,
	onSetLevel: Function,
	serverName: string,
	setActiveLevel: Function,
}

/**
 * Displays the root node for a server.
 */
export const RootNode = (props: Props) => {
	const {
		activeLevel,
		currentLevel,
		levelList,
		onHome,
		onReset,
		onSelect,
		onSetLevel,
		serverName,
		setActiveLevel,
	} = props;
	const [ rootNodes, setRootNodes ] = useState<Array<any>>([]);
	const [ selectedNode, setSelectedNode ] = useState<any | null>(null);
	const { sendApisHubRequest, } = useContext(HubContext);

	useEffect(() => {
		if (serverName && sendApisHubRequest) {
			const isoDate = (new Date()).toISOString();

			const sigRequestPackage = {
				onFailure: (err: string) => {
					console.error(err);
				},
				onSuccess: (responses: Array<object>) => {
					if (!responses || responses.length <= 0) {
						return;
					}

					setRootNodes(responses);
				},
				parameters: [
					{
						serverName,
					}
				],
				requestId: "OpcUaBrowserRoots" + isoDate,
				requestType: "OpcUaNodeBrowseRoot",
			};
			sendApisHubRequest(sigRequestPackage);
		} else {
			setRootNodes([]);
		}
	}, [ serverName ]);

	/**
	 * Displays a row for each root node.
	 */
	function eachRootNode (item: any, index: number) {
		const {
			displayName,
			name,
		} = item;

		return (
			<div
				key={index}
				onClick={(event) => {
					setActiveLevel(currentLevel + 1);
					setSelectedNode(item);
				}}
				style={{
					cursor: "pointer",
				}}
			>
				{displayName || name}
			</div>
		);
	}

	if (activeLevel < currentLevel) {
		return null;
	}

	const node = selectedNode?.node;
	const newLevelList = [ ...levelList ];
	newLevelList.push({
		level: currentLevel,
		name: selectedNode?.displayName || selectedNode?.name,
	});

	return (
		<div className="browsable-node">
			{activeLevel === currentLevel &&
			<span>
				<i
					className="fas fa-home is-clickable"
					onClick={() => { onHome(); }}
					title="Return to the server list"
				/>
				<i
					className="fas fa-arrow-left ml-3 is-clickable"
					onClick={() => { onReset(); }}
					title="Go back one level"
				/>
			</span>}
			{!selectedNode && rootNodes && rootNodes.length > 0 && rootNodes.map(eachRootNode)}
			{selectedNode &&
			<UANode
				activeLevel={activeLevel}
				currentLevel={currentLevel + 1}
				levelList={newLevelList}
				node={node}
				onHome={onHome}
				onReset={() => {
					setActiveLevel(currentLevel);
					setSelectedNode(null);
				}}
				onSelect={onSelect}
				onSetLevel={(newLevel: number) => {
					onSetLevel(newLevel);
					if (newLevel < currentLevel) {
						setSelectedNode(null);
					}
				}}
				serverName={serverName}
				setActiveLevel={setActiveLevel}
			/>}
		</div>
	);
};
