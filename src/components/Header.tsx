import React, { useRef } from 'react';
import {
  Layers,
  Download,
  Upload,
  RotateCcw,
  FileSpreadsheet,
  CheckCircle2,
  HardDrive,
} from 'lucide-react';
import { ActiveTab, TunnelProjectState } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  state: TunnelProjectState;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onOpenBulkCsv: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  state,
  onExportBackup,
  onImportBackup,
  onOpenBulkCsv,
  onResetData,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formatLastSavedTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    } catch {
      return 'Just now';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportBackup(e.target.files[0]);
      e.target.value = '';
    }
  };

  const tabs: { id: ActiveTab; label: string; num: string }[] = [
    { id: '01_project_inputs', label: 'Project Inputs', num: '01' },
    { id: '02_engineering_assumptions', label: 'Assumptions', num: '02' },
    { id: '03_price_database', label: 'Price DB', num: '03' },
    { id: '04_resource_rates', label: 'Resource Rates', num: '04' },
    { id: '05_drill_blast_engine', label: 'Calc Engine', num: '05' },
    { id: '06_material_boq', label: 'Material BOQ', num: '06' },
    { id: '07_cost_summary_analysis', label: 'Executive Summary', num: '07' },
  ];

  return (
    <header className="sticky top-0 z-50 h-[56px] w-full bg-white border-b border-[#E5E5DF] flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Brand identity & project name */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="w-7 h-7 rounded-md bg-[#051C2C] flex items-center justify-center text-white shadow-xs">
            <Layers className="w-4 h-4 text-[#2251FF]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="serif text-lg font-bold tracking-tight text-[#051C2C]">
              TunnelTakeoff <span className="text-[#2251FF] text-xs font-sans font-semibold tracking-normal px-1.5 py-0.5 bg-[#2251FF]/10 rounded">PRO</span>
            </span>
            <span className="text-gray-300 hidden md:inline">|</span>
            <span className="text-[12px] text-[#888888] max-w-[160px] truncate hidden lg:inline-block" title={state.projectInputs.projectName}>
              {state.projectInputs.projectName}
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Center) */}
        <nav className="flex items-center h-[56px] space-x-1 overflow-x-auto no-scrollbar mx-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative h-[56px] px-2.5 sm:px-3 flex items-center space-x-1.5 text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-[#051C2C] font-semibold'
                    : 'text-[#888888] hover:text-[#051C2C]'
                }`}
              >
                <span
                  className={`text-[10px] font-mono px-1 py-0.2 rounded-sm ${
                    isActive ? 'bg-[#051C2C] text-white' : 'bg-gray-100 text-[#888888]'
                  }`}
                >
                  {tab.num}
                </span>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2251FF]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Action Tools (Right) */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className="text-[11px] text-[#888888] hidden xl:inline-block">
            Last saved: <strong className="font-mono text-gray-700">{formatLastSavedTime(state.lastSaved)}</strong>
          </span>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={onOpenBulkCsv}
            className="px-3 py-1.5 bg-[#051C2C] text-white hover:bg-[#051C2C]/90 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1 cursor-pointer shadow-xs"
            title="Bulk CSV Import / Export for Price Database"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2251FF]" />
            <span className="hidden sm:inline">Bulk CSV</span>
          </button>

          <button
            onClick={onExportBackup}
            className="px-2.5 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center space-x-1 cursor-pointer"
            title="Export full project backup file (JSON)"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span className="hidden md:inline">Export</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center space-x-1 cursor-pointer"
            title="Import project backup file (JSON)"
          >
            <Upload className="w-3.5 h-3.5 text-gray-600" />
            <span className="hidden md:inline">Import</span>
          </button>

          <button
            onClick={onResetData}
            className="p-1.5 text-gray-400 hover:text-[#D32F2F] hover:bg-red-50 rounded-md transition-colors cursor-pointer"
            title="Reset all inputs to baseline engineering default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
