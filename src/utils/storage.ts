import { TunnelProjectState, PriceDatabaseItem, LaborRateItem } from '../types';
import { DEFAULT_PROJECT_STATE } from './defaultData';

const LOCAL_STORAGE_KEY = 'drill_blast_tunnel_saas_state_v2';

export function loadProjectState(): TunnelProjectState {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_PROJECT_STATE;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.projectInputs && parsed.engineeringAssumptions && parsed.priceDatabase) {
      return parsed;
    }
    return DEFAULT_PROJECT_STATE;
  } catch (err) {
    console.error('Error loading project state from localStorage:', err);
    return DEFAULT_PROJECT_STATE;
  }
}

export function saveProjectState(state: TunnelProjectState): TunnelProjectState {
  const updatedState = {
    ...state,
    lastSaved: new Date().toISOString(),
  };
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
  } catch (err) {
    console.error('Error saving project state to localStorage:', err);
  }
  return updatedState;
}

export function exportProjectBackupJson(state: TunnelProjectState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const filename = `TunnelTakeoff_Backup_${state.projectInputs.projectId || 'Project'}_${new Date().toISOString().slice(0, 10)}.json`;
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseProjectBackupJson(jsonString: string): TunnelProjectState {
  const parsed = JSON.parse(jsonString);
  if (!parsed || !parsed.projectInputs || !parsed.engineeringAssumptions || !Array.isArray(parsed.priceDatabase)) {
    throw new Error('Invalid project backup file schema. Missing key sections.');
  }
  return {
    ...DEFAULT_PROJECT_STATE,
    ...parsed,
    lastSaved: new Date().toISOString(),
  };
}

// Bulk CSV helpers
export function exportPriceDatabaseCsv(items: PriceDatabaseItem[]): void {
  const headers = ['Material_ID', 'Category', 'Material_Name', 'Specification', 'Unit', 'Base_Unit_Rate', 'Waste_Allowance_Rate_Percent'];
  const rows = items.map((i) => [
    `"${i.id}"`,
    `"${i.category}"`,
    `"${i.name}"`,
    `"${i.specification}"`,
    `"${i.unit}"`,
    i.baseUnitRate,
    (i.wasteAllowanceRate * 100).toFixed(2),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Price_Database_Export.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function parsePriceDatabaseCsv(csvText: string): PriceDatabaseItem[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error('CSV must contain at least header and one data row.');
  }

  const items: PriceDatabaseItem[] = [];
  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // simple regex to handle quoted values with commas
    const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || line.split(',');
    const cleanParts = parts.map((p) => p.replace(/^"|"$/g, '').trim());

    if (cleanParts.length >= 6) {
      const id = cleanParts[0] || `MAT-${String(i).padStart(3, '0')}`;
      const category = cleanParts[1] || 'General Materials';
      const name = cleanParts[2] || 'Unnamed Material';
      const specification = cleanParts[3] || '-';
      const unit = cleanParts[4] || 'kg';
      const baseUnitRate = parseFloat(cleanParts[5]) || 0;
      let waste = 0;
      if (cleanParts[6]) {
        const rawWaste = parseFloat(cleanParts[6].replace('%', ''));
        waste = rawWaste > 1 ? rawWaste / 100 : rawWaste;
      }

      items.push({
        id,
        category,
        name,
        specification,
        unit,
        baseUnitRate,
        wasteAllowanceRate: isNaN(waste) ? 0.05 : waste,
      });
    }
  }

  if (items.length === 0) {
    throw new Error('No valid material rows could be parsed from the CSV.');
  }

  return items;
}

export function exportBOQCsv(boqItems: any[], currency = '$'): void {
  const headers = ['Material_ID', 'Category', 'Material_Name', 'Specification', 'Unit', 'BOQ_Quantity', 'Effective_Unit_Rate', 'Total_Cost', 'Cost_Share_Percent'];
  const rows = boqItems.map((i) => [
    `"${i.id}"`,
    `"${i.category}"`,
    `"${i.name}"`,
    `"${i.specification}"`,
    `"${i.unit}"`,
    i.quantity.toFixed(2),
    i.effectiveUnitRate.toFixed(2),
    i.totalCost.toFixed(2),
    i.costSharePercent.toFixed(2) + '%',
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'Material_BOQ_Export.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
}
