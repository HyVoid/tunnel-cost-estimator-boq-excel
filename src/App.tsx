import React, { useState, useEffect, useMemo } from 'react';
import {
  ActiveTab,
  TunnelProjectState,
  ProjectInputs,
  EngineeringAssumptions,
  PriceDatabaseItem,
  EquipmentRateItem,
  LaborRateItem,
} from './types';
import {
  loadProjectState,
  saveProjectState,
  exportProjectBackupJson,
  parseProjectBackupJson,
} from './utils/storage';
import { DEFAULT_PROJECT_STATE } from './utils/defaultData';
import {
  computeEngineMetrics,
  computeBOQ,
  computeCostSummary,
} from './utils/calculations';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { EngineeringDisclaimerBanner } from './components/EngineeringDisclaimerBanner';
import { ProjectInputsSheet } from './components/ProjectInputsSheet';
import { EngineeringAssumptionsSheet } from './components/EngineeringAssumptionsSheet';
import { PriceDatabaseSheet } from './components/PriceDatabaseSheet';
import { ResourceRatesSheet } from './components/ResourceRatesSheet';
import { DrillBlastEngineSheet } from './components/DrillBlastEngineSheet';
import { MaterialBOQSheet } from './components/MaterialBOQSheet';
import { CostSummarySheet } from './components/CostSummarySheet';
import { BulkCsvModal } from './components/BulkCsvModal';
import { Footer } from './components/Footer';

export default function App() {
  const [state, setState] = useState<TunnelProjectState>(() => loadProjectState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('01_project_inputs');
  const [isBulkCsvOpen, setIsBulkCsvOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-save on state change
  useEffect(() => {
    saveProjectState(state);
  }, [state]);

  // Compute all downstream metrics in real-time
  const engine = useMemo(() => computeEngineMetrics(state), [state]);
  const { boqItems, totalMaterialCost } = useMemo(
    () => computeBOQ(state, engine),
    [state, engine]
  );
  const costSummary = useMemo(
    () => computeCostSummary(state, engine, totalMaterialCost),
    [state, engine, totalMaterialCost]
  );

  // Handlers for sheet updates
  const handleUpdateInputs = (updated: Partial<ProjectInputs>) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      projectInputs: { ...prev.projectInputs, ...updated },
    }));
  };

  const handleUpdateAssumptions = (updated: Partial<EngineeringAssumptions>) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      engineeringAssumptions: { ...prev.engineeringAssumptions, ...updated },
    }));
  };

  // Price Database handlers
  const handleUpdatePriceItem = (id: string, updated: Partial<PriceDatabaseItem>) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      priceDatabase: prev.priceDatabase.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      ),
    }));
  };

  const handleAddPriceItem = (newItem: PriceDatabaseItem) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      priceDatabase: [...prev.priceDatabase, newItem],
    }));
  };

  const handleDeletePriceItem = (id: string) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      priceDatabase: prev.priceDatabase.filter((item) => item.id !== id),
    }));
  };

  const handleBulkImportPrices = (newItems: PriceDatabaseItem[]) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      priceDatabase: newItems,
    }));
  };

  // Equipment handlers
  const handleUpdateEquipment = (id: string, updated: Partial<EquipmentRateItem>) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      equipmentRates: prev.equipmentRates.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      ),
    }));
  };

  const handleAddEquipment = (newItem: EquipmentRateItem) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      equipmentRates: [...prev.equipmentRates, newItem],
    }));
  };

  const handleDeleteEquipment = (id: string) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      equipmentRates: prev.equipmentRates.filter((item) => item.id !== id),
    }));
  };

  // Labor handlers
  const handleUpdateLabor = (id: string, updated: Partial<LaborRateItem>) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      laborRates: prev.laborRates.map((item) =>
        item.id === id ? { ...item, ...updated } : item
      ),
    }));
  };

  const handleAddLabor = (newItem: LaborRateItem) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      laborRates: [...prev.laborRates, newItem],
    }));
  };

  const handleDeleteLabor = (id: string) => {
    setState((prev) => ({
      ...prev,
      lastSaved: new Date().toISOString(),
      laborRates: prev.laborRates.filter((item) => item.id !== id),
    }));
  };

  // Global Backup Actions
  const handleExportBackup = () => {
    exportProjectBackupJson(state);
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseProjectBackupJson(text);
        setState(parsed);
        alert('Project backup successfully restored!');
      } catch (err: any) {
        alert('Failed to import backup file: ' + (err.message || 'Invalid format'));
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all project parameters, price database, and rates to baseline engineering defaults? Any custom modifications will be replaced.')) {
      setState({
        ...DEFAULT_PROJECT_STATE,
        lastSaved: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#051C2C] flex">
      {/* Left Permanent / Responsive Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        state={state}
        onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onResetData={handleResetData}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Workspace Column (offset for 72 = 288px sidebar on lg screens) */}
      <div className="flex-1 min-w-0 lg:ml-72 flex flex-col min-h-screen">
        {/* Simplified Editorial Top Bar */}
        <TopBar
          activeTab={activeTab}
          state={state}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
          onExportBackup={handleExportBackup}
        />

        {/* Main Content Area */}
        <main className="grow w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Engineering Scope & Professional Judgment Advisory Banner */}
          <EngineeringDisclaimerBanner />

          {activeTab === '01_project_inputs' && (
            <ProjectInputsSheet
              inputs={state.projectInputs}
              engine={engine}
              onChange={handleUpdateInputs}
            />
          )}

          {activeTab === '02_engineering_assumptions' && (
            <EngineeringAssumptionsSheet
              assumptions={state.engineeringAssumptions}
              projectInputs={state.projectInputs}
              engine={engine}
              onChange={handleUpdateAssumptions}
            />
          )}

          {activeTab === '03_price_database' && (
            <PriceDatabaseSheet
              items={state.priceDatabase}
              projectInputs={state.projectInputs}
              onUpdateItem={handleUpdatePriceItem}
              onAddItem={handleAddPriceItem}
              onDeleteItem={handleDeletePriceItem}
              onOpenBulkCsv={() => setIsBulkCsvOpen(true)}
            />
          )}

          {activeTab === '04_resource_rates' && (
            <ResourceRatesSheet
              equipmentRates={state.equipmentRates}
              laborRates={state.laborRates}
              projectInputs={state.projectInputs}
              onUpdateEquipment={handleUpdateEquipment}
              onAddEquipment={handleAddEquipment}
              onDeleteEquipment={handleDeleteEquipment}
              onUpdateLabor={handleUpdateLabor}
              onAddLabor={handleAddLabor}
              onDeleteLabor={handleDeleteLabor}
            />
          )}

          {activeTab === '05_drill_blast_engine' && (
            <DrillBlastEngineSheet
              engine={engine}
              projectInputs={state.projectInputs}
              engineeringAssumptions={state.engineeringAssumptions}
            />
          )}

          {activeTab === '06_material_boq' && (
            <MaterialBOQSheet
              boqItems={boqItems}
              totalMaterialCost={totalMaterialCost}
              projectInputs={state.projectInputs}
            />
          )}

          {activeTab === '07_cost_summary_analysis' && (
            <CostSummarySheet
              costSummary={costSummary}
              projectInputs={state.projectInputs}
              engine={engine}
              onUpdateInputs={handleUpdateInputs}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Bulk CSV Modal */}
      <BulkCsvModal
        isOpen={isBulkCsvOpen}
        onClose={() => setIsBulkCsvOpen(false)}
        items={state.priceDatabase}
        onImportItems={handleBulkImportPrices}
      />
    </div>
  );
}
