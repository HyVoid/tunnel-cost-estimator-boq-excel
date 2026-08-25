import {
  TunnelProjectState,
  ComputedEngine,
  BOQItem,
  CostSummary,
} from '../types';

export function computeEngineMetrics(state: TunnelProjectState): ComputedEngine {
  const { projectInputs: p, engineeringAssumptions: e, laborRates } = state;

  // Geometry
  const length = Math.max(0, p.tunnelLength);
  const area = Math.max(0, p.sectionArea);
  const perimeter = Math.max(0, p.perimeter);
  const overbreak = Math.max(0, p.overbreakRate);

  const theoreticalVolume = length * area;
  const designExcavationVolume = theoreticalVolume * (1 + overbreak);

  // Blast Cycles
  const pullLen = Math.max(0.1, e.pullLength);
  const totalCycles = Math.ceil(length / pullLen);
  const volumePerCycle = area * pullLen * (1 + overbreak);
  const drillingMetersPerCycle = e.holesPerRound * e.holeDepth;
  const totalDrillMeters = totalCycles * drillingMetersPerCycle;

  // Materials Physical Quantities
  const totalExplosiveQty = designExcavationVolume * e.explosiveFactor;
  const totalDetonatorsQty = totalCycles * e.detonatorPerRound;
  const totalDrillRodLoss = totalDrillMeters * e.drillRodLossRate;
  const totalShotcreteVolume = length * perimeter * e.shotcreteThickness;

  const boltSpacing = Math.max(0.1, e.rockBoltSpacing);
  const totalRockBoltsQty = Math.ceil(perimeter / boltSpacing) * Math.ceil(length / boltSpacing);

  const archSpacing = Math.max(0.1, e.steelArchSpacing);
  const totalSteelArchWeight = (Math.ceil(length / archSpacing) * perimeter * e.steelArchWeightPerM) / 1000; // in tons

  // Equipment Hours
  const drillSpeed = Math.max(1, e.jumboDrillingSpeedMPerHour || 60);
  const muckingSpeed = Math.max(1, e.muckingCapacityM3PerHour || 40);
  const shotcreteSpeed = Math.max(1, e.shotcreteRobotSpeedM3PerHour || 5);

  const jumboHours = totalDrillMeters / drillSpeed;
  const muckingHours = designExcavationVolume / muckingSpeed;
  const shotcreteRigHours = totalShotcreteVolume / shotcreteSpeed;

  const totalCrewSize = laborRates.reduce((acc, curr) => acc + (curr.crewSizePerShift || 0), 0);
  const cycleCoreHours = jumboHours + muckingHours + shotcreteRigHours;
  const totalLabourHours = totalCrewSize * cycleCoreHours;

  return {
    theoreticalVolume,
    designExcavationVolume,
    totalCycles,
    volumePerCycle,
    drillingMetersPerCycle,
    totalDrillMeters,
    totalExplosiveQty,
    totalDetonatorsQty,
    totalDrillRodLoss,
    totalShotcreteVolume,
    totalRockBoltsQty,
    totalSteelArchWeight,
    jumboHours,
    muckingHours,
    shotcreteRigHours,
    totalCrewSize,
    totalLabourHours,
  };
}

export function computeBOQ(state: TunnelProjectState, engine: ComputedEngine): { boqItems: BOQItem[]; totalMaterialCost: number } {
  const { priceDatabase } = state;

  // Map each material ID to its calculated physical demand
  const items: BOQItem[] = priceDatabase.map((mat) => {
    let quantity = 0;
    const cleanId = mat.id.trim().toUpperCase();

    if (cleanId === 'MAT-001' || mat.name.toLowerCase().includes('explosive') || mat.name.toLowerCase().includes('emulsion')) {
      quantity = engine.totalExplosiveQty;
    } else if (cleanId === 'MAT-002' || mat.name.toLowerCase().includes('detonator')) {
      quantity = engine.totalDetonatorsQty;
    } else if (cleanId === 'MAT-003' || mat.name.toLowerCase().includes('rod') || mat.name.toLowerCase().includes('bit') || mat.name.toLowerCase().includes('drill')) {
      quantity = engine.totalDrillRodLoss;
    } else if (cleanId === 'MAT-004' || mat.name.toLowerCase().includes('shotcrete') || mat.name.toLowerCase().includes('concrete')) {
      quantity = engine.totalShotcreteVolume;
    } else if (cleanId === 'MAT-005' || mat.name.toLowerCase().includes('bolt') || mat.name.toLowerCase().includes('anchor')) {
      quantity = engine.totalRockBoltsQty;
    } else if (cleanId === 'MAT-006' || mat.name.toLowerCase().includes('arch') || mat.name.toLowerCase().includes('steel')) {
      quantity = engine.totalSteelArchWeight;
    } else {
      quantity = 0;
    }

    const effectiveUnitRate = mat.baseUnitRate * (1 + (mat.wasteAllowanceRate || 0));
    const totalCost = quantity * effectiveUnitRate;

    return {
      id: mat.id,
      category: mat.category,
      name: mat.name,
      specification: mat.specification,
      unit: mat.unit,
      quantity,
      effectiveUnitRate,
      totalCost,
      costSharePercent: 0, // calculated below
    };
  });

  const totalMaterialCost = items.reduce((acc, item) => acc + item.totalCost, 0);

  // Calculate percentages
  const boqItems = items.map((item) => ({
    ...item,
    costSharePercent: totalMaterialCost > 0 ? (item.totalCost / totalMaterialCost) * 100 : 0,
  }));

  return { boqItems, totalMaterialCost };
}

export function computeCostSummary(
  state: TunnelProjectState,
  engine: ComputedEngine,
  totalMaterialCost: number
): CostSummary {
  const { projectInputs: p, equipmentRates, laborRates } = state;

  // Equipment Cost Calculation:
  // EQP-001 (Jumbo) -> jumboHours
  // EQP-002 (Mucking) -> muckingHours
  // EQP-003 (Shotcrete rig) -> shotcreteRigHours
  // EQP-004 (Ventilation/Services) -> cumulative core hours
  const coreHours = engine.jumboHours + engine.muckingHours + engine.shotcreteRigHours;

  let equipmentCost = 0;
  equipmentRates.forEach((eqp, idx) => {
    const totalRate = (eqp.baseHourlyRate || 0) + (eqp.operatingCostPerHour || 0);
    const cleanId = eqp.id.trim().toUpperCase();
    let hours = 0;

    if (cleanId === 'EQP-001' || eqp.name.toLowerCase().includes('jumbo')) {
      hours = engine.jumboHours;
    } else if (cleanId === 'EQP-002' || eqp.name.toLowerCase().includes('loader') || eqp.name.toLowerCase().includes('muck') || eqp.name.toLowerCase().includes('hauler')) {
      hours = engine.muckingHours;
    } else if (cleanId === 'EQP-003' || eqp.name.toLowerCase().includes('shotcrete') || eqp.name.toLowerCase().includes('manipulator')) {
      hours = engine.shotcreteRigHours;
    } else {
      hours = coreHours;
    }
    equipmentCost += hours * totalRate;
  });

  // Labor Cost Calculation:
  // Sum of each role's (coreHours * crewSize * effectiveWage)
  let labourCost = 0;
  laborRates.forEach((role) => {
    const effectiveWage = (role.baseHourlyWage || 0) * (1 + (role.allowanceOvertimeRate || 0));
    const roleTotalHours = coreHours * (role.crewSizePerShift || 0);
    labourCost += roleTotalHours * effectiveWage;
  });

  const directCostSubtotal = totalMaterialCost + equipmentCost + labourCost;
  const siteOverheadCost = directCostSubtotal * (p.overheadRate || 0);
  const contingencyCost = directCostSubtotal * (p.contingencyRate || 0);
  const totalProductionCost = directCostSubtotal + siteOverheadCost + contingencyCost;
  const targetProfitAmount = totalProductionCost * (p.profitMarginRate || 0);
  const totalContractPrice = totalProductionCost + targetProfitAmount;

  const length = Math.max(1, p.tunnelLength);
  const volume = Math.max(1, engine.designExcavationVolume);

  const costPerMeter = totalContractPrice / length;
  const costPerCubic = totalContractPrice / volume;
  const directCostRatio = totalContractPrice > 0 ? directCostSubtotal / totalContractPrice : 0;

  const categoryBreakdown = {
    materialsPercent: totalContractPrice > 0 ? (totalMaterialCost / totalContractPrice) * 100 : 0,
    equipmentPercent: totalContractPrice > 0 ? (equipmentCost / totalContractPrice) * 100 : 0,
    laborPercent: totalContractPrice > 0 ? (labourCost / totalContractPrice) * 100 : 0,
    overheadPercent: totalContractPrice > 0 ? (siteOverheadCost / totalContractPrice) * 100 : 0,
    contingencyPercent: totalContractPrice > 0 ? (contingencyCost / totalContractPrice) * 100 : 0,
    profitPercent: totalContractPrice > 0 ? (targetProfitAmount / totalContractPrice) * 100 : 0,
  };

  return {
    materialCost: totalMaterialCost,
    equipmentCost,
    labourCost,
    directCostSubtotal,
    siteOverheadCost,
    contingencyCost,
    totalProductionCost,
    targetProfitAmount,
    totalContractPrice,
    costPerMeter,
    costPerCubic,
    directCostRatio,
    categoryBreakdown,
  };
}

// Format utilities
export function formatCurrency(amount: number, currency = '$', decimals = 2): string {
  if (isNaN(amount) || !isFinite(amount)) return `${currency}0.00`;
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return amount < 0 ? `-${currency}${formatted}` : `${currency}${formatted}`;
}

export function formatNumber(val: number, decimals = 2, unit = ''): string {
  if (isNaN(val) || !isFinite(val)) return `0${unit ? ' ' + unit : ''}`;
  const formatted = val.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return unit ? `${formatted} ${unit}` : formatted;
}

export function formatPercent(val: number, decimals = 1): string {
  if (isNaN(val) || !isFinite(val)) return '0.0%';
  return `${(val * 100).toFixed(decimals)}%`;
}
