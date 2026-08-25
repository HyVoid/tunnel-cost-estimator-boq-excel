import React from 'react';
import { ActiveTab, TunnelProjectState } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { Menu, FileSpreadsheet, Download, CheckCircle2, Layers } from 'lucide-react';

interface TopBarProps {
  activeTab: ActiveTab;
  state: TunnelProjectState;
  onOpenMobileMenu: () => void;
  onOpenBulkCsv: () => void;
  onExportBackup: () => void;
}

const tabTitles: Record<ActiveTab, { num: string; title: string; desc: string }> = {
  '01_project_inputs': {
    num: '01',
    title: 'Project Inputs & Geometry',
    desc: 'Geometry, Overbreak & Commercial Rates',
  },
  '02_engineering_assumptions': {
    num: '02',
    title: 'Engineering Assumptions',
    desc: 'Blast Pattern & Support Parameters',
  },
  '03_price_database': {
    num: '03',
    title: 'Material Price Database',
    desc: 'Base Unit Rates & Waste Allowances',
  },
  '04_resource_rates': {
    num: '04',
    title: 'Resource & Plant Rates',
    desc: 'Equipment Fleet & Labor Payroll',
  },
  '05_drill_blast_engine': {
    num: '05',
    title: 'Drill & Blast Engine',
    desc: 'Formula-Driven Physical Takeoff Quantities',
  },
  '06_material_boq': {
    num: '06',
    title: 'Material BOQ Schedule',
    desc: 'Dynamic Bill of Quantities & Procurement Plan',
  },
  '07_cost_summary_analysis': {
    num: '07',
    title: 'Executive Cost Summary',
    desc: 'Tender Bids & Commercial Cost Distribution',
  },
};

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  state,
  onOpenMobileMenu,
  onOpenBulkCsv,
  onExportBackup,
}) => {
  const currentTab = tabTitles[activeTab];

  return (
    <header className="sticky top-0 z-30 h-14 bg-white border-b border-[#E8E8E6] flex items-center justify-between px-4 lg:px-8 shadow-xs">
      {/* Left: Mobile Toggle + Breadcrumb */}
      <div className="flex items-center space-x-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          className="p-1.5 rounded-md text-gray-600 hover:text-[#051C2C] hover:bg-[#F5F5F2] lg:hidden cursor-pointer shrink-0"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 truncate">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm shrink-0">
            Sheet {currentTab.num}
          </span>
          <span className="text-gray-300 font-light">/</span>
          <h2 className="text-sm font-semibold text-[#051C2C] truncate font-sans">
            {currentTab.title}
          </h2>
          <span className="text-xs text-[#888888] hidden md:inline truncate">
            — {currentTab.desc}
          </span>
        </div>
      </div>

      {/* Right: Quick Context Badges & Actions */}
      <div className="flex items-center space-x-3 shrink-0">
        {/* Currency & Length Badge */}
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono bg-[#F5F5F2] border border-[#E8E8E6] px-2.5 py-1 rounded-md text-gray-700">
          <span className="text-[#888888]">Currency:</span>
          <span className="font-bold text-[#051C2C]">{state.projectInputs.currencyCode}</span>
          <span className="text-gray-300">|</span>
          <span className="text-[#888888]">L:</span>
          <span className="font-bold text-[#051C2C]">{formatNumber(state.projectInputs.tunnelLengthMeters, 0)}m</span>
        </div>

        <button
          onClick={onOpenBulkCsv}
          className="h-8 px-2.5 rounded-md text-xs font-medium text-[#051C2C] bg-[#F5F5F2] hover:bg-[#E8E8E6] border border-[#E8E8E6] transition-colors flex items-center space-x-1 cursor-pointer shadow-2xs"
          title="Bulk Price DB Importer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#2251FF]" />
          <span className="hidden md:inline">Price CSV</span>
        </button>

        <button
          onClick={onExportBackup}
          className="h-8 px-2.5 rounded-md text-xs font-medium text-white bg-[#051C2C] hover:bg-[#051C2C]/90 transition-colors flex items-center space-x-1 cursor-pointer shadow-2xs"
          title="Export Project Backup JSON"
        >
          <Download className="w-3.5 h-3.5 text-gray-300" />
          <span className="hidden sm:inline">Backup</span>
        </button>
      </div>
    </header>
  );
};
