import { TunnelProjectState } from '../types';

export const DEFAULT_PROJECT_STATE: TunnelProjectState = {
  version: '2.0.0',
  lastSaved: new Date().toISOString(),
  projectInputs: {
    projectId: 'PRJ-TN-2026-001',
    projectName: 'Alpine Ridge Highway Tunnel - Package 2A',
    tunnelLength: 1500.0, // 1500 meters
    sectionArea: 65.5, // 65.5 m²
    perimeter: 26.2, // 26.2 m
    overbreakRate: 0.08, // 8.0% overbreak
    currencyCode: '$',
    overheadRate: 0.12, // 12.0% site overhead
    contingencyRate: 0.08, // 8.0% contingency
    profitMarginRate: 0.15, // 15.0% target margin
  },
  engineeringAssumptions: {
    pullLength: 3.0, // 3.0 m advance per round
    holesPerRound: 120, // 120 blast & contour holes
    holeDepth: 3.3, // 3.3 m hole depth
    explosiveFactor: 1.25, // 1.25 kg/m³
    detonatorPerRound: 125, // 125 electronic/non-el detonators
    drillRodLossRate: 0.0035, // 0.0035 m/m consumed
    shotcreteThickness: 0.15, // 15 cm shotcrete lining
    rockBoltSpacing: 1.2, // 1.2 m grid spacing
    rockBoltLength: 3.0, // 3.0 m length
    steelArchWeightPerM: 38.5, // 38.5 kg/m (HEB 140 / I18)
    steelArchSpacing: 1.0, // 1.0 m spacing
    jumboDrillingSpeedMPerHour: 60.0, // 60 drilling m/hour
    muckingCapacityM3PerHour: 40.0, // 40 m³/hour mucking capacity
    shotcreteRobotSpeedM3PerHour: 5.0, // 5 m³/hour robot rate
  },
  priceDatabase: [
    {
      id: 'MAT-001',
      category: 'Explosives & Blasting',
      name: 'Bulk Emulsion Explosive',
      specification: 'High VOD Matrix 1.15 g/cm³',
      unit: 'kg',
      baseUnitRate: 4.80,
      wasteAllowanceRate: 0.03, // 3% waste
    },
    {
      id: 'MAT-002',
      category: 'Explosives & Blasting',
      name: 'Digital Electronic Detonators',
      specification: 'Programmable Millisecond Delay',
      unit: 'pcs',
      baseUnitRate: 16.50,
      wasteAllowanceRate: 0.02, // 2% waste
    },
    {
      id: 'MAT-003',
      category: 'Drilling Consumables',
      name: 'R32 Premium Drill Rods & Bits',
      specification: 'High Alloy Tungsten Carbide 45mm',
      unit: 'm',
      baseUnitRate: 42.00,
      wasteAllowanceRate: 0.05, // 5% waste
    },
    {
      id: 'MAT-004',
      category: 'Ground Support',
      name: 'Fiber-Reinforced Wet Shotcrete',
      specification: 'C30/37 with 35kg/m³ Steel Fibers',
      unit: 'm³',
      baseUnitRate: 185.00,
      wasteAllowanceRate: 0.15, // 15% rebound & overbreak waste
    },
    {
      id: 'MAT-005',
      category: 'Ground Support',
      name: 'Resin-Grouted System Rock Bolts',
      specification: 'HRB500 Ø25mm Threadbar L=3.0m',
      unit: 'pcs',
      baseUnitRate: 36.00,
      wasteAllowanceRate: 0.04, // 4% waste
    },
    {
      id: 'MAT-006',
      category: 'Ground Support',
      name: 'Structural Steel Arch Support',
      specification: 'Heavy Section I18/HEB140 S355',
      unit: 'ton',
      baseUnitRate: 1680.00,
      wasteAllowanceRate: 0.05, // 5% cutting waste
    },
  ],
  equipmentRates: [
    {
      id: 'EQP-001',
      category: 'Drilling & Blasting',
      name: 'Two-Boom Hydraulic Jumbo Drill',
      baseHourlyRate: 135.00,
      operatingCostPerHour: 85.00,
    },
    {
      id: 'EQP-002',
      category: 'Mucking & Haulage',
      name: 'Tunnel Wheel Loader 4.5m³ & Hauler',
      baseHourlyRate: 95.00,
      operatingCostPerHour: 75.00,
    },
    {
      id: 'EQP-003',
      category: 'Ground Support',
      name: 'Robotic Wet Shotcrete Manipulator Rig',
      baseHourlyRate: 110.00,
      operatingCostPerHour: 60.00,
    },
    {
      id: 'EQP-004',
      category: 'Auxiliary & Services',
      name: 'Ventilation, Dewatering & Genset System',
      baseHourlyRate: 45.00,
      operatingCostPerHour: 35.00,
    },
  ],
  laborRates: [
    {
      id: 'LAB-001',
      roleName: 'Jumbo Lead Operator',
      baseHourlyWage: 38.00,
      allowanceOvertimeRate: 0.25, // 25% underground allowance
      crewSizePerShift: 2,
    },
    {
      id: 'LAB-002',
      roleName: 'Certified Blaster & Charge Hand',
      baseHourlyWage: 42.00,
      allowanceOvertimeRate: 0.30, // 30% hazardous allowance
      crewSizePerShift: 2,
    },
    {
      id: 'LAB-003',
      roleName: 'Mucking & Heavy Equipment Driver',
      baseHourlyWage: 34.00,
      allowanceOvertimeRate: 0.20, // 20% allowance
      crewSizePerShift: 3,
    },
    {
      id: 'LAB-004',
      roleName: 'Shotcrete Nozzleman / Robot Tech',
      baseHourlyWage: 36.00,
      allowanceOvertimeRate: 0.25, // 25% allowance
      crewSizePerShift: 2,
    },
    {
      id: 'LAB-005',
      roleName: 'Steel Arch & Bolt Support Erector',
      baseHourlyWage: 30.00,
      allowanceOvertimeRate: 0.20, // 20% allowance
      crewSizePerShift: 4,
    },
    {
      id: 'LAB-006',
      roleName: 'General Underground Utility Labor',
      baseHourlyWage: 24.00,
      allowanceOvertimeRate: 0.15, // 15% allowance
      crewSizePerShift: 3,
    },
  ],
};
