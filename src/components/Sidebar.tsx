import React from 'react';
import { ActiveTab, TunnelProjectState } from '../types';
import {
  Layers,
  FileText,
  Sliders,
  Database,
  Users,
  Cpu,
  FileSpreadsheet,
  TrendingUp,
  FileJson,
  Upload,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  state: TunnelProjectState;
  onOpenBulkCsv: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onResetData: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  state,
  onOpenBulkCsv,
  onExportBackup,
  onImportBackup,
  onResetData,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const navItems = [
    {
      id: '01_project_inputs' as ActiveTab,
      num: '01',
      label: 'Project Inputs',
      sub: 'Geometry & Setup',
      icon: FileText,
    },
    {
      id: '02_engineering_assumptions' as ActiveTab,
      num: '02',
      label: 'Assumptions',
      sub: 'Blast & Support Design',
      icon: Sliders,
    },
    {
      id: '03_price_database' as ActiveTab,
      num: '03',
      label: 'Price DB',
      sub: 'Procurement Rates',
      icon: Database,
    },
    {
      id: '04_resource_rates' as ActiveTab,
      num: '04',
      label: 'Resource Rates',
      sub: 'Fleet & Crew Rates',
      icon: Users,
    },
    {
      id: '05_drill_blast_engine' as ActiveTab,
      num: '05',
      label: 'Calc Engine',
      sub: 'Physical Takeoff',
      icon: Cpu,
    },
    {
      id: '06_material_boq' as ActiveTab,
      num: '06',
      label: 'Material BOQ',
      sub: 'Bill of Quantities',
      icon: FileSpreadsheet,
    },
    {
      id: '07_cost_summary_analysis' as ActiveTab,
      num: '07',
      label: 'Executive Summary',
      sub: 'Tender Bids & KPIs',
      icon: TrendingUp,
    },
  ];

  const formatLastSavedTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return '--:--:--';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-[#051C2C]/30 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container - Light-First Surface */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white text-[#051C2C] flex flex-col justify-between border-r border-[#E8E8E6] shadow-sm transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Section */}
        <div className="p-5 border-b border-[#E8E8E6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[#2251FF] flex items-center justify-center text-white shadow-xs">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="serif text-base font-bold tracking-tight text-[#051C2C] leading-snug">
                    Tunnel Drill-and-Blast
                  </span>
                </div>
                <div className="text-[11px] text-[#2251FF] font-medium font-sans mt-0.5 leading-tight">
                  Cost Estimation &amp; BOQ Engine
                </div>
              </div>
            </div>

            {/* Close button for mobile */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-md text-gray-500 hover:text-[#051C2C] hover:bg-gray-100 lg:hidden cursor-pointer"
                title="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Active Project Card */}
          <div className="mt-4 p-3 rounded-lg bg-[#F5F5F2] border border-[#E8E8E6]">
            <div className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold font-mono">
              Active Project
            </div>
            <div className="text-xs font-semibold text-[#051C2C] truncate mt-0.5" title={state.projectInputs.projectName}>
              {state.projectInputs.projectName || 'Untitled Tunnel Project'}
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8E8E6] text-[11px] text-[#888888]">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-[#00C853]" />
                <span className="text-gray-600">Local Storage</span>
              </div>
              <span className="font-mono text-[#051C2C] text-[10px] font-medium">{formatLastSavedTime(state.lastSaved)}</span>
            </div>
          </div>
        </div>

        {/* Navigation Item List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 no-scrollbar">
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-widest text-[#888888] font-mono">
            Worksheet Sheets
          </div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#2251FF] text-white shadow-xs font-semibold'
                    : 'text-[#1A1A2E] hover:bg-[#F5F5F2] hover:text-[#051C2C]'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                    isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.num}
                </span>
                <div className="grow min-w-0">
                  <div className="text-xs font-medium truncate leading-tight">
                    {item.label}
                  </div>
                  <div
                    className={`text-[10px] truncate leading-tight mt-0.5 ${
                      isActive ? 'text-blue-100' : 'text-[#888888]'
                    }`}
                  >
                    {item.sub}
                  </div>
                </div>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Data Actions & Notice */}
        <div className="p-4 border-t border-[#E8E8E6] bg-[#FAFAFA] space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenBulkCsv}
              className="py-1.5 px-2 bg-white hover:bg-gray-50 border border-[#E8E8E6] rounded-md text-[11px] font-medium text-[#051C2C] transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
              title="Bulk CSV Import / Export for Price Database"
            >
              <FileSpreadsheet className="w-3 h-3 text-[#2251FF]" />
              <span>Bulk CSV</span>
            </button>

            <button
              onClick={onExportBackup}
              className="py-1.5 px-2 bg-white hover:bg-gray-50 border border-[#E8E8E6] rounded-md text-[11px] font-medium text-[#051C2C] transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
              title="Export full project backup file (JSON)"
            >
              <FileJson className="w-3 h-3 text-gray-500" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="py-1.5 px-2 bg-white hover:bg-gray-50 border border-[#E8E8E6] rounded-md text-[11px] font-medium text-[#051C2C] transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
              title="Import project backup file (JSON)"
            >
              <Upload className="w-3 h-3 text-gray-500" />
              <span>Import JSON</span>
            </button>

            <button
              onClick={onResetData}
              className="py-1.5 px-2 bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-[#E8E8E6] rounded-md text-[11px] font-medium text-gray-600 transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
              title="Reset all inputs to baseline default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Mini Engineering Scope Notice */}
          <div className="p-2.5 rounded-lg bg-[#F5F5F2] border border-[#E8E8E6] text-[10px] text-gray-600 leading-relaxed">
            <div className="flex items-center space-x-1 text-[#051C2C] font-semibold mb-1">
              <AlertTriangle className="w-3 h-3 text-[#2251FF]" />
              <span>Engineering Notice</span>
            </div>
            <span>Computational BOQ & cost model only. Does not replace professional blast & geotechnical engineering design.</span>
          </div>
        </div>
      </aside>
    </>
  );
};
