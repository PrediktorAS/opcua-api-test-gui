export interface AlarmType {
	severity: string;
	text: string;
}

export interface ApexChartSeriesType {
	axisIndex?: number;
	axisPosition?: string;
	data: Array<number | undefined>;
	hasLegend?: boolean;
	name?: string;
	numberOfDecimals?: number;
	type?: string;
	unit?: string;
	unitPosition?: string;
}

export interface AvailableConnectionType {
	serverName: string,
	opcUaServerName: string,
	dataStoreAddress: string,
	useSecurity: boolean,
}

export interface EnterpriseType {
	nodeName?: string;
	totalACCapacity?: number;
	totalActiveEnergy?: number;
	totalActivePower?: number;
	uaNodeId?: string;
}

export interface EnterpriseInformationType {
	enterprise?: EnterpriseType,
	enterpriseCalltime?: Date,
	enterpriseStructure?: TwinType,
}

export interface ExtendedEnterpriseType {
	nodeName?: ExtendedPropertyType;
	totalACCapacity?: ExtendedPropertyType;
	totalActiveEnergy?: ExtendedPropertyType;
	totalActivePower?: ExtendedPropertyType;
	uaNodeId?: ExtendedPropertyType;
}

export interface ExtendedInverterType {
	aCActivePower?: ExtendedPropertyType;
	aCDailyActiveEnergy?: ExtendedPropertyType;
	dCPower?: ExtendedPropertyType;
	capacityAvailability?: ExtendedPropertyType;
	id?: ExtendedPropertyType;
	name?: ExtendedPropertyType;
	nodeId?: ExtendedPropertyType;
	nodeName?: ExtendedPropertyType;
	nominalDCPower?: ExtendedPropertyType;
	pr?: ExtendedPropertyType;
	pRMeasure?: ExtendedPropertyType;
	siteName?: ExtendedPropertyType;
	status?: ExtendedPropertyType;
	statusText?: ExtendedPropertyType;
	technicalAvailability?: ExtendedPropertyType;
	tooltip?: ExtendedPropertyType;
	uaNodeId?: ExtendedPropertyType;
}

export interface ExtendedPropertyType {
	nodeId?: string;
	quality?: string;
	timestamp?: string;
	value?: number;
}

export interface ExtendedSiteType {
	aCActivePower?: ExtendedPropertyType;
	aCDailyActiveEnergy?: ExtendedPropertyType;
	dCPower?: ExtendedPropertyType;
	capacityAvailability?: ExtendedPropertyType;
	id?: ExtendedPropertyType;
	name?: ExtendedPropertyType;
	nodeId?: ExtendedPropertyType;
	nodeName?: ExtendedPropertyType;
	nominalDCPower?: ExtendedPropertyType;
	pr?: ExtendedPropertyType;
	pRMeasure?: ExtendedPropertyType;
	siteName?: ExtendedPropertyType;
	status?: ExtendedPropertyType;
	statusText?: ExtendedPropertyType;
	technicalAvailability?: ExtendedPropertyType;
	tooltip?: ExtendedPropertyType;
	uaNodeId?: ExtendedPropertyType;
}

export interface HistoricalResponseType {
	values: Array<HistoricalValueType>;
}

export interface HistoricalValueType {
	quality?: string;
	timestamp?: Date;
	value?: number;
}

export interface HubContextType {
	sendApisHubRequest?: Function;
}

export interface InverterType {
	aCActivePower?: number;
	aCDailyActiveEnergy?: number;
	aCReactivePower?: number;
	activeEnergyDaily?: number;
	activeEnergyTotalFeedIn?: number;
	activePower?: number;
	acVoltagePhaseAB?: number;
	acVoltagePhaseBC?: number;
	acVoltagePhaseCA?: number;
	dCPower?: number;
	dCVoltage?: number;
	capacityAvailability?: number;
	deviceType?: string;
	frequency?: number;
	id?: string;
	model?: string;
	name?: string;
	nodeId?: string;
	nodeName?: string;
	nominalACPower?: number;
	nominalDCPower?: number;
	parentId?: string;
	parentName?: string;
	phaseACurrent?: number;
	phaseBCurrent?: number;
	phaseCCurrent?: number;
	pr?: number;
	pRMeasure?: number;
	reactivePower?: number;
	siteName?: string;
	status?: number;
	statusText?: string;
	supplier?: string;
	technicalAvailability?: number;
	tooltip?: string;
	totalProduction?: number;
	uaNodeId?: string;
}

export interface OpcUACurrentFetch {
	serverName: string,
	node: OpcUaNode,
	displayName: string,
	signalName: string,
}

export interface OpcUaNode {
	namespaceIndex?: number,
	idType?: number,
	identifier?: string,
	isNullNodeId?: boolean,
}

export interface RawEnterpriseType {
	extendedProperties?: ExtendedEnterpriseType;
	name?: string;
	parentTwinId?: number;
	properties?: EnterpriseType;
	twinClassId?: number;
	twinId?: number;
	twinParameters?: Array<TwinParameterType>;
	twinProperties?: Array<ExtendedPropertyType>;
	twinSignals?: Array<object>;
	twinStoredProcedures?: Array<object>;
	uaNodeId?: string;
}

export interface RawInverterType {
	extendedProperties: ExtendedInverterType;
	name: string;
	parentTwinId?: number;
	properties: InverterType;
	twinClassId?: number;
	twinId?: number;
	twinParameters: Array<TwinParameterType>;
	twinProperties: ExtendedInverterType;
	twinSignals: Array<object>;
	twinStoredProcedures: Array<object>;
	uaNodeId?: string;
}

export interface RawRegionType {
	extendedProperties: Array<ExtendedPropertyType>;
	name: string;
	parentTwinId?: number;
	properties: RegionType;
	twinClassId?: number;
	twinId?: number;
	twinParameters: Array<TwinParameterType>;
	twinProperties: Array<ExtendedPropertyType>;
	twinSignals: Array<object>;
	twinStoredProcedures: Array<object>;
	uaNodeId?: string;
}

export interface RawSiteType {
	extendedProperties: ExtendedSiteType;
	name: string;
	parentTwinId?: number;
	properties: SiteType;
	twinClassId?: number;
	twinId?: number;
	twinParameters: Array<TwinParameterType>;
	twinProperties: Array<ExtendedPropertyType>;
	twinSignals: Array<object>;
	twinStoredProcedures: Array<object>;
	uaNodeId?: string;
}

export interface RawStringSetType {
	extendedProperties: Array<ExtendedPropertyType>;
	name: string;
	parentTwinId?: number;
	properties: StringSetType;
	twinClassId?: number;
	twinId?: number;
	twinParameters: Array<TwinParameterType>;
	twinProperties: Array<ExtendedPropertyType>;
	twinSignals: Array<object>;
	twinStoredProcedures: Array<object>;
	uaNodeId?: string;
}

export interface RegionType {
	regionKey: number;
	regionTitle: string;
	totalActiveEnergy?: number;
	totalActivePower?: number;
	totalACCapacity?: number;
}

export interface RegionInformationType {
	regions: Array<RawRegionType>;
	regionsCalltime?: Date;
	regionsStructure: Array<TwinType>,
}

export interface SiteInformationType {
	sites: Array<RawSiteType>;
	sitesCalltime?: Date;
	sitesStructure: Array<TwinType>,
}

export interface SignalRRequestPackageType {
	requestId: string;
	requestType: string;
	onSuccess: Function;
	parameters?: Array<Object>;
}

export interface SignalRResponsePackageType {
	errorMessages: Array<string>;
	json: string;
	requestId: string;
}

export interface SiteType {
	aCActivePower?: number;
	actualVsBudget?: number;
	ambientTemperature?: number;
	annualCO2FootprintForecast?: number;
	annualHouseholdsForecast?: number;
	annualYieldForecast?: number;
	capacityAvailability?: number;
	coordinateLatitude?: number;
	coordinateLongitude?: number;
	country?: string;
	countryCode?: string;
	ePI?: number;
	horizontalIrradiation?: number;
	id: String;
	imageURL?: string;
	localTime: Date;
	location?: string;
	name: String;
	nodeName: String;
	nominalACPower?: number;
	nominalDCPower?: number;
	nominalPlantAvailability?: number;
	noOfInverters?: number;
	plantDetailsURL?: string;
	pRMeasure?: number;
	pRTarget?: number;
	rainAmount?: number;
	regionKey?: number;
	regionTitle?: string;
	siteName?: string;
	shortName?: String;
	startedDate: Date;
	status?: number;
	technicalAvailability?: number;
	totalACCapacity?: number;
	totalActiveEnergy?: number;
	totalActivePowerExport?: number;
	uaNodeId?: String;
	weatherSymbolNumber?: number;
	windSpeed?: number;
}

export interface StringSetType {
	azimuth?: number;
	dcActivePower?: number;
	dcCurrent?: number;
	dcNominalPower?: number;
	dcPower?: number;
	dcPowerCalculated?: number;
	dcRelativePower?: number;
	dcVoltage?: number;
	model?: string;
	name?: string;
	nodeId?: string;
	nodeName?: string;
	nominalACPower?: number;
	parentId?: string;
	parentName?: string;
	shortName?: string;
	specificPower?: number;
	status?: number;
	tilt?: number;
	uaNodeId?: string;
}

export interface StyleContextType {
	mode: string;
	setMessagesVisible: Function;
	setMode: Function;
	style: string;
}

export interface TileType {
	backgroundColor: string;
	id?: string;
	name: string;
	status: string;
	tooltip: string;
}

export interface TwinClassType {
	name?: string;
	twinClassId?: number;
}

export interface TwinNodeTemplateType {
	apiServerName?: string,
	isRoot?: boolean;
	name?: string;
	parentTwinNodeTemplateId?: number;
	twinNodeTemplateId?: number;
	uaNodeId?: string;
	uaType?: string;
}

export interface TwinNodeTemplateHistoryType {
	status?: string;
	timestamp?: string;
	value?: number;
}

export interface TwinParameterType {
	name?: string;
	twinClassId?: number;
	twinId?: number;
	twinNodeTemplateId?: number;
	twinParameterId?: number;
	value?: string;
}

export interface TwinPropertyType {
	name?: string;
	twinId?: number;
	value?: number;
}

export interface TwinSignalType {
	apiServerName?: string,
	moduleName?: string;
	name?: string;
	signalName?: string;
	twinId?: number;
	twinClassId?: number;
	twinNodeTemplateId?: number;
	twinSignalId?: number;
	value?: {
		value?: number;
	}
}

export interface TwinStoredProcedureType {
	storedProcedureName?: string;
	twinId?: number;
	twinClassId?: number;
	twinNodeTemplateId?: number;
	twinStoredProcedureId?: number;
}

export interface TwinStoredProcedureParameterType {
	name?: string;
	twinStoredProcedureId?: number;
	twinStoredProcedureParameterId?: number;
	value?: string;
	valueType?: string;
}

export interface TwinType {
	extendedProperties?: Array<ExtendedPropertyType>;
	name?: string;
	nodeId?: string;
	opcUaRequests?: Array<OpcUACurrentFetch>;
	parentTwinId?: number;
	properties?: any;
	signals?: Array<TwinSignalType>;
	twinClassId?: number;
	twinId?: number;
	twinParameters?: Array<TwinParameterType>;
	twinProperties?: Array<ExtendedPropertyType>;
	twinSignals?: Array<object>;
	twinStoredProcedures?: Array<object>;
	uaNodeId?: string;
}

export interface WorldMapType {
	countriesPerRegion?: Array<Record<string, object>>;
	currentSite?: SiteType;
	enterpriseData?: EnterpriseType;
	onSiteClick: Function,
	regionData?: Array<RegionType>;
	siteData?: Array<SiteType>;
}
