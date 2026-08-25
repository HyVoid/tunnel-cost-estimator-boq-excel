export type ActiveTab = 
  | '01_project_inputs'
  | '02_engineering_assumptions'
  | '03_price_database'
  | '04_resource_rates'
  | '05_drill_blast_engine'
  | '06_material_boq'
  | '07_cost_summary_analysis';

export interface ProjectInputs {
  projectId: string;
  projectName: string;
  tunnelLength: number; // m
  sectionArea: number; // m²
  perimeter: number; // m
  overbreakRate: number; // e.g. 0.08 for 8%
  currencyCode: string; // e.g. "$"
  overheadRate: number; // e.g. 0.12 for 12%
  contingencyRate: number; // e.g. 0.08 for 8%
  profitMarginRate: number; // e.g. 0.15 for 15%
}

export interface EngineeringAssumptions {
  pullLength: number; // m
  holesPerRound: number; // integer count
  holeDepth: number; // m
  explosiveFactor: number; // kg/m³
  detonatorPerRound: number; // integer count
  drillRodLossRate: number; // m/m
  shotcreteThickness: number; // m
  rockBoltSpacing: number; // m
  rockBoltLength: number; // m
  steelArchWeightPerM: number; // kg/m
  steelArchSpacing: number; // m
  jumboDrillingSpeedMPerHour: number; // default 60 m/h
  muckingCapacityM3PerHour: number; // default 40 m³/h
  shotcreteRobotSpeedM3PerHour: number; // default 5 m³/h
}

export interface PriceDatabaseItem {
  id: string; // e.g. "MAT-001"
  category: string; // e.g. "Explosives & Blasting", "Drilling Consumables", "Ground Support"
  name: string;
  specification: string;
  unit: string; // kg, pcs, m, m³, ton
  baseUnitRate: number;
  wasteAllowanceRate: number; // e.g. 0.05 for 5%
  // effectiveUnitRate is computed
}

export interface EquipmentRateItem {
  id: string; // e.g. "EQP-001"
  category: string;
  name: string;
  baseHourlyRate: number; // depreciation / rental
  operatingCostPerHour: number; // fuel, power, maintenance
  // totalHourlyRate is computed
}

export interface LaborRateItem {
  id: string; // e.g. "LAB-001"
  roleName: string;
  baseHourlyWage: number;
  allowanceOvertimeRate: number; // e.g. 0.25 for 25%
  crewSizePerShift: number;
  // effectiveHourlyWage is computed
}

export interface ComputedEngine {
  theoreticalVolume: number;
  designExcavationVolume: number;
  totalCycles: number;
  volumePerCycle: number;
  drillingMetersPerCycle: number;
  totalDrillMeters: number;
  totalExplosiveQty: number;
  totalDetonatorsQty: number;
  totalDrillRodLoss: number;
  totalShotcreteVolume: number;
  totalRockBoltsQty: number;
  totalSteelArchWeight: number;
  jumboHours: number;
  muckingHours: number;
  shotcreteRigHours: number;
  totalCrewSize: number;
  totalLabourHours: number;
}

export interface BOQItem {
  id: string;
  category: string;
  name: string;
  specification: string;
  unit: string;
  quantity: number;
  effectiveUnitRate: number;
  totalCost: number;
  costSharePercent: number;
}

export interface CostSummary {
  materialCost: number;
  equipmentCost: number;
  labourCost: number;
  directCostSubtotal: number;
  siteOverheadCost: number;
  contingencyCost: number;
  totalProductionCost: number;
  targetProfitAmount: number;
  totalContractPrice: number;
  costPerMeter: number;
  costPerCubic: number;
  directCostRatio: number;
  categoryBreakdown: {
    materialsPercent: number;
    equipmentPercent: number;
    laborPercent: number;
    overheadPercent: number;
    contingencyPercent: number;
    profitPercent: number;
  };
}

export interface TunnelProjectState {
  version: string;
  lastSaved: string;
  projectInputs: ProjectInputs;
  engineeringAssumptions: EngineeringAssumptions;
  priceDatabase: PriceDatabaseItem[];
  equipmentRates: EquipmentRateItem[];
  laborRates: LaborRateItem[];
}
