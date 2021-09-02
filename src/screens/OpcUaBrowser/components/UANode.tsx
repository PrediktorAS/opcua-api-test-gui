import React, { useContext, useEffect, useState } from "react";
import { HubContext } from "../../../MainScreen";

type Props = {
	activeLevel: number,
	currentLevel: number,
	levelList: Array<{
		name: string,
		level: number,
	}>,
	node: any | null,
	onHome: Function,
	onReset: Function,
	onSelect: Function,
	onSetLevel: Function,
	serverName: string,
	setActiveLevel: Function,
}

/**
 * Displays an OPC UA node and allows for browsing to the children or selection.
 */
export const UANode = (props: Props) => {
	const {
		activeLevel,
		currentLevel,
		node,
		levelList,
		onHome,
		onReset,
		onSelect,
		onSetLevel,
		serverName,
		setActiveLevel,
	} = props;
	const [ children, setChildren ] = useState<Array<any>>([]);
	const [ selectedChild, setSelectedChild ] = useState<any | null>(null);
	const { sendApisHubRequest, } = useContext(HubContext);
	const [ showHistory, setShowHistory ] = useState(false);

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

					const firstResponse: any = responses[0];
					if (!firstResponse) {
						return;
					}

					const {
						children,
					} = firstResponse;

					setChildren(children);
				},
				parameters: [
					{
						node,
						serverName,
					}
				],
				requestId: "OpcUaBrowserRoots" + isoDate,
				requestType: "OpcUaGetChildren",
			};
			sendApisHubRequest(sigRequestPackage);
		} else {
			setChildren([]);
		}
	}, [ node ]);

	if (!node) {
		return null;
	}

	/**
	 * Displays a row for each child.
	 */
	function eachChild (item: any, index: number) {
		const {
			displayName,
			name,
			nodeId,
		} = item;

		const nodeInfo = nodeId.split(";");
		if (nodeInfo.length < 2) {
			return;
		}

		return (
			<tr
				key={index}
			>
				<td
					onClick={(event) => {
						setActiveLevel(currentLevel + 1);

						const namespaceIndex = parseInt(nodeInfo[0].substring(3, 100), 10);
						const identifier = nodeInfo[1].substring(2, 1000);

						setSelectedChild({
							...item,
							...{
								node: {
									idType: 0,
									identifier,
									isNullNodeId: false,
									namespaceIndex,
								},
							},
						});
					}}
					style={{
						cursor: "pointer",
					}}
				>{displayName || name}
				</td>
				<td>{nodeId}</td>
				<td>
					<button
						onClick={() => { onSelect(nodeId); }}
					>
						Select
					</button>
				</td>
			</tr>
		);
	}

	if (activeLevel < currentLevel) {
		return null;
	}

	const childNode = selectedChild?.node;
	const newLevelList = [ ...levelList ];
	newLevelList.push({
		level: currentLevel,
		name: selectedChild?.displayName || selectedChild?.name,
	});

	return (
		<div className="browsable-node">
			{activeLevel === currentLevel &&
			<div
				className="is-clearfix"
			>
				<div className="subtitle is-6 is-pulled-left">
					{levelList[levelList.length - 1].name}
				</div>
				<div className={`dropdown is-hoverable is-right is-pulled-right ${showHistory ? " is-active" : ""}`}>
					<div className="dropdown-trigger">
						<i
							aria-haspopup="true" aria-controls="dropdown-menu4"
							className="fas fa-ellipsis-h ml-3 is-clickable is-pulled-right"
							onClick={() => { setShowHistory(!showHistory); }}
							title="Click to display a list of the navigation history"
						/>
					</div>
					<div className="dropdown-menu" id="dropdown-menu4" role="menu">
						<div className="dropdown-content">
							{levelList && levelList.length > 0 && levelList.map((item, index) => {
								const {
									level,
									name,
								} = item;

								return (
									<div
										className="dropdown-item is-clickable"
										key={index}
										onClick={() => { onSetLevel(level + 1); }}
									>
										{name}
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<i
					className="fas fa-arrow-left ml-3 is-clickable is-pulled-right"
					onClick={() => { onReset(); }}
					title="Go back one level"
				/>
				<i
					className="fas fa-home ml-3 is-clickable is-pulled-right"
					onClick={() => { onHome(); }}
					title="Return to the server list"
				/>
			</div>}
			{showHistory &&
				<div />}
			{!selectedChild &&
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Node Id</th>
						<th>Select</th>
					</tr>
				</thead>
				<tbody>
					{children && children.length > 0 && children.map(eachChild)}
				</tbody>
			</table>}
			{selectedChild &&
			<UANode
				activeLevel={activeLevel}
				currentLevel={currentLevel + 1}
				levelList={newLevelList}
				node={childNode}
				onHome={onHome}
				onReset={() => {
					setActiveLevel(currentLevel);
					setSelectedChild(null);
				}}
				onSelect={onSelect}
				onSetLevel={(newLevel: number) => {
					onSetLevel(newLevel);
					if (newLevel <= currentLevel) {
						setSelectedChild(null);
					}
				}}
				serverName={serverName}
				setActiveLevel={setActiveLevel}
			/>}
		</div>
	);
};
