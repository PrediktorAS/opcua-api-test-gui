import React, { useContext, useEffect, useState } from "react";
import { HubContext } from "../../MainScreen";
import { ServerNames } from "./components/ServerNames";

/**
 * Lets users browse OPC UA servers based on their connection to the OPC UA API backend.
 */
export const OpcUaBrowser = () => {
	const [ serverNames, setServerNames ] = useState<Array<string>>([]);
	const [ selectedNode, setSelectedNode ] = useState<any>({});
	const [ selectedValue, setSelectedValue ] = useState<any>({});
	const [ selectedHistory, setSelectedHistory ] = useState<any>({});
	const [ selectedAlarms, setSelectedAlarms ] = useState<any>({});
	const [ valueToSet, setValueToSet ] = useState<any>(0);
	const { sendApisHubRequest, } = useContext(HubContext);

	useEffect(() => {
		if (sendApisHubRequest) {
			const isoDate = (new Date()).toISOString();

			const sigRequestPackage = {
				onFailure: (err: string) => {
					console.error(err);
				},
				onSuccess: (responses: Array<object>) => {
					if (!responses || responses.length <= 0) {
						return;
					}

					const newServerNames = responses.map((item: any) => {
						return (item.serverName);
					});

					setServerNames(newServerNames);
				},
				parameters: {},
				requestId: "OpcUaBrowser" + isoDate,
				requestType: "OpcUaGetConnections",
			};
			sendApisHubRequest(sigRequestPackage);
		}
	}, []);

	useEffect(() => {
		if (selectedNode?.nodeId) {
			fetchCurrentValue(selectedNode.serverName, selectedNode.nodeId);
		}
	}, [ selectedNode ]);

	/**
	 * Gets the current value for the selected node.
	 */
	function fetchCurrentValue (serverName: string, nodeId: string) {
		if (sendApisHubRequest) {
			const isoDate = (new Date()).toISOString();
			const nodeInfo = nodeId.split(";");
			if (nodeInfo.length < 2) {
				return;
			}

			const namespaceIndex = parseInt(nodeInfo[0].substring(3, 100), 10);
			const identifier = nodeInfo[1].substring(2, 1000);

			const sigRequestPackage = {
				onFailure: (err: string) => {
					console.error(err);
				},
				onSuccess: (responses: Array<object>) => {
					if (!responses || responses.length <= 0) {
						return;
					}

					const firstResponse = responses[0];
					if (!firstResponse) {
						return;
					}

					setSelectedValue(firstResponse);
				},
				parameters: [
					{
						displayName: "Selected Node",
						name: "Selected",
						node: {
							idType: 0,
							identifier,
							isNullNodeId: false,
							namespaceIndex,
						},
						serverName,
					}
				],
				requestId: "OpcUaBrowser" + isoDate,
				requestType: "OpcUaGetCurrent",
			};
			sendApisHubRequest(sigRequestPackage);
		}
	}

	/**
	 * Sets the current value for the selected node.
	 */
	function setCurrentValue (serverName: string, nodeId: string, newValue: number) {
		if (sendApisHubRequest) {
			const isoDate = (new Date()).toISOString();
			const nodeInfo = nodeId.split(";");
			if (nodeInfo.length < 2) {
				return;
			}

			const namespaceIndex = parseInt(nodeInfo[0].substring(3, 100), 10);
			const identifier = nodeInfo[1].substring(2, 1000);

			const sigRequestPackage = {
				onFailure: (err: string) => {
					console.error(err);
				},
				onSuccess: (responses: Array<object>) => {
					fetchCurrentValue(serverName, nodeId);
				},
				parameters: [
					{
						displayName: "Selected Node",
						name: "Selected",
						node: {
							idType: 0,
							identifier,
							isNullNodeId: false,
							namespaceIndex,
						},
						serverName,
						targetValue: newValue.toString(),
					}
				],
				requestId: "OpcUaBrowser" + isoDate,
				requestType: "OpcUaSetCurrent",
			};
			sendApisHubRequest(sigRequestPackage);
		}
	}

	/**
	 * Gets the current value for the selected node.
	 */
	function fetchHistory (serverName: string, nodeId: string) {
		if (sendApisHubRequest) {
			const isoDate = (new Date()).toISOString();
			const nodeInfo = nodeId.split(";");
			if (nodeInfo.length < 2) {
				return;
			}

			const namespaceIndex = parseInt(nodeInfo[0].substring(3, 100), 10);
			const identifier = nodeInfo[1].substring(2, 1000);

			const endTime = new Date();
			const startTime = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes() - 1, endTime.getSeconds());

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

					const { values, } = firstResponse;
					setSelectedHistory(values);
				},
				parameters: [
					{
						aggregation: "Interpolative",
						displayName: "Selected Node",
						endTime,
						interval: 250,
						name: "Selected",
						node: {
							idType: 0,
							identifier,
							isNullNodeId: false,
							namespaceIndex,
						},
						serverName,
						startTime,
					}
				],
				requestId: "OpcUaBrowser" + isoDate,
				requestType: "OpcUaGetHistorical",
			};
			sendApisHubRequest(sigRequestPackage);
		}
	}

	/**
	 * Gets the alarms for the selected node.
	 */
	function fetchAlarms (nodeId: string) {
		if (sendApisHubRequest) {
			const isoDate = (new Date()).toISOString();
			const nodeInfo = nodeId.split(";");
			if (nodeInfo.length < 2) {
				return;
			}

			const sigRequestPackage = {
				onFailure: (err: string) => {
					console.error(err);
				},
				onSuccess: (responses: Array<object>) => {
					console.log(responses);

					// if (!responses || responses.length <= 0) {
					// 	return;
					// }

					// const firstResponse = responses[0];
					// if (!firstResponse) {
					// 	return;
					// }

					// setSelectedValue(firstResponse);
				},
				parameters: [
					{
						displayName: "Selected Node",
						name: "Selected",
						sourceNodeId: nodeId,
					}
				],
				requestId: "OpcUaBrowser" + isoDate,
				requestType: "OpcUaGetAlarms",
			};
			sendApisHubRequest(sigRequestPackage);
		}
	}

	/**
	 * Displays a row for each history value.
	 */
	function eachHistoryValue (item: any, index: number) {
		const {
			timestamp,
			value,
		} = item;

		return (
			<tr>
				<td>
					{value}
				</td>
				<td>
					{timestamp}
				</td>
			</tr>
		);
	}

	/**
	 * Displays a row for each alarm.
	 */
	function eachAlarm (item: any, index: number) {
		const {
			timestamp,
			value,
		} = item;

		return (
			<tr>
				<td>
					{value}
				</td>
				<td>
					{timestamp}
				</td>
			</tr>
		);
	}

	return (
		<div className="container is-fluid p-0">
			<div>
				<div style={{ float: "left", height: "60vh", width: "100%", }}>
					<div style={{ float: "left", height: "100%", width: "25%", }}>
						<ServerNames
							onSelect={(nodeId: string, serverName: string) => {
								setSelectedNode({
									nodeId,
									serverName,
								});
							}}
							serverNames={serverNames}
						/>
						<div className="field">
							<label htmlFor="" className="label">
								OPC UA Server Name
							</label>
							<div className="control has-icons-right">
								<input
									type="text"
									className="input"
									data-id="InputServerName"
									onChange={(event) => {
										if (!event) {
											return;
										}

										const { target, } = event;
										if (!target) {
											return;
										}

										setSelectedNode({
											...selectedNode,
											...{
												serverName: target.value,
											},
										});
									}}
									placeholder="Server Name"
									value={selectedNode?.serverName || ""}
								/>
							</div>
						</div>
						<div className="field">
							<label htmlFor="" className="label">
								Node Id
							</label>
							<div className="control has-icons-right">
								<input
									type="text"
									className="input"
									data-id="InputNodeId"
									onChange={(event) => {
										if (!event) {
											return;
										}

										const { target, } = event;
										if (!target) {
											return;
										}

										setSelectedNode({
											...selectedNode,
											...{
												nodeId: target.value,
											},
										});
									}}
									placeholder="Node Id"
									value={selectedNode?.nodeId || ""}
								/>
							</div>
						</div>
						<div className="field">
							<label htmlFor="" className="label">
								Value to Set
							</label>
							<div className="control has-icons-right">
								<input
									type="number"
									className="input"
									data-id="InputValue"
									onChange={(event) => {
										if (!event) {
											return;
										}

										const { target, } = event;
										if (!target) {
											return;
										}

										const numValue = parseFloat(target.value);
										setValueToSet(numValue);
									}}
									placeholder="Value to Set"
									value={valueToSet}
								/>
							</div>
						</div>
						<button
							className="button"
							data-id="FetchCurrentValueButton"
							onClick={() => {
								fetchCurrentValue(selectedNode?.serverName, selectedNode?.nodeId);
							}}
						>
							Fetch Current Value
						</button>
						<button
							className="button"
							data-id="FetchHistoryButton"
							onClick={() => {
								fetchHistory(selectedNode?.serverName, selectedNode?.nodeId);
							}}
						>
							Fetch History
						</button>
						<button
							className="button"
							data-id="FetchAlarmsButton"
							onClick={() => {
								fetchAlarms(selectedNode?.nodeId);
							}}
						>
							Fetch Alarms
						</button>
						<button
							className="button"
							data-id="SetCurrentValueButton"
							onClick={() => {
								setCurrentValue(selectedNode?.serverName, selectedNode?.nodeId, valueToSet);
							}}
						>
							Set Current Value
						</button>
					</div>
					<div style={{ float: "left", height: "100%", paddingLeft: "5%", width: "70%", }}>
						<div className="field">
							<label htmlFor="" className="label">
								Selected Node:
							</label>
							<span
								className="control"
								data-id="SelectedNodeId"
							>
								{selectedNode?.nodeId}
							</span>
						</div>
						<div className="field">
							<label htmlFor="" className="label">
								Selected Value:
							</label>
							<span
								className="control"
								data-id="SelectedValue"
							>
								{selectedValue?.value}
							</span>
						</div>
						<div className="field">
							<label htmlFor="" className="label">
								Selected Quality:
							</label>
							<span
								className="control"
								data-id="SelectedQuality"
							>
								{selectedValue?.quality}
							</span>
						</div>
						<div className="field">
							<label htmlFor="" className="label">
								Selected Timestamp:
							</label>
							<span
								className="control"
								data-id="SelectedTimestamp"
							>
								{selectedValue?.timestamp}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div style={{ float: "left", height: "90vh", overflowY: "auto", width: "50%", }}>
					<table className="table">
						<thead>
							<tr>
								<th>
									Value
								</th>
								<th>
									Timestamp
								</th>
							</tr>
						</thead>
						<tbody>
							{selectedHistory && selectedHistory.length > 0 && selectedHistory.map(eachHistoryValue)}
						</tbody>
					</table>
				</div>
				<div style={{ float: "left", height: "90vh", overflowY: "auto", paddingLeft: "5%", width: "45%", }}>
					<table className="table">
						<thead>
							<tr>
								<th>
									Value
								</th>
								<th>
									Timestamp
								</th>
							</tr>
						</thead>
						<tbody>
							{selectedAlarms && selectedAlarms.length > 0 && selectedAlarms.map(eachAlarm)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
