import React from 'react';
import { ProjectInputs, ComputedEngine } from '../types';
import { formatNumber, formatPercent } from '../utils/calculations';
import { Building2, Ruler, Percent, Info } from 'lucide-react';

interface ProjectInputsSheetProps {
  inputs: ProjectInputs;
  engine: ComputedEngine;
  onChange: (updated: Partial<ProjectInputs>) => void;
}

export const ProjectInputsSheet: React.FC<ProjectInputsSheetProps> = ({
  inputs,
  engine,
  onChange,
}) => {
  const currencies = ['$', '€', '£', '¥', 'CHF', 'CAD', 'AUD', 'NZD', 'SEK', 'NOK'];

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 01
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Project Basic Parameters
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Global project geometric dimensions, settlement currency, and commercial mark-up rates. Formulas in downstream engines link directly to these cells.
          </p>
        </div>

        {/* Live Computed Excavation Volumes */}
        <div className="flex items-center space-x-4 bg-white p-3 rounded-xl shadow-xs border border-[#E8E8E6]">
          <div className="border-r border-[#E8E8E6] pr-4">
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Theoretical Vol (V₀)</div>
            <div className="text-lg font-display font-bold text-[#051C2C]">
              {formatNumber(engine.theoreticalVolume, 2, 'm³')}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#2251FF] font-medium font-mono">Design Vol (w/ Overbreak)</div>
            <div className="text-lg font-display font-bold text-[#2251FF]">
              {formatNumber(engine.designExcavationVolume, 2, 'm³')}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Identification & Currency */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center space-x-2 text-[#051C2C] pb-2 border-b border-[#E8E8E6]">
            <Building2 className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold">Project Identification</h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Project ID (Code)
              </label>
              <input
                type="text"
                value={inputs.projectId}
                onChange={(e) => onChange({ projectId: e.target.value })}
                className="w-full editable-input text-xs"
                placeholder="e.g. PRJ-TN-2026-001"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={inputs.projectName}
                onChange={(e) => onChange({ projectName: e.target.value })}
                className="w-full editable-input text-xs"
                placeholder="Tunnel Project Name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Settlement Currency
              </label>
              <select
                value={inputs.currencyCode}
                onChange={(e) => onChange({ currencyCode: e.target.value })}
                className="w-full editable-input text-xs"
              >
                {currencies.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr} ({curr === '$' ? 'USD/AUD/CAD' : curr === '€' ? 'EUR' : curr === '£' ? 'GBP' : curr})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tunnel Geometry Inputs */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center space-x-2 text-[#051C2C] pb-2 border-b border-[#E8E8E6]">
            <Ruler className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold">Tunnel Geometry (C5 : C8)</h2>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Tunnel Length (L)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="1"
                min="1"
                value={inputs.tunnelLength}
                onChange={(e) => onChange({ tunnelLength: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Design Section Area (A₀)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">m²</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={inputs.sectionArea}
                onChange={(e) => onChange({ sectionArea: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Excavation Perimeter (P)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={inputs.perimeter}
                onChange={(e) => onChange({ perimeter: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Allowable Overbreak Rate (k_ob)
                </label>
                <span className="text-[11px] text-[#2251FF] font-bold font-mono">
                  {formatPercent(inputs.overbreakRate, 1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="50"
                  value={(inputs.overbreakRate * 100).toFixed(1)}
                  onChange={(e) => onChange({ overbreakRate: (parseFloat(e.target.value) || 0) / 100 })}
                  className="w-24 editable-input text-xs font-mono"
                />
                <span className="text-xs text-gray-500">%</span>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  value={inputs.overbreakRate * 100}
                  onChange={(e) => onChange({ overbreakRate: parseFloat(e.target.value) / 100 })}
                  className="grow accent-[#2251FF]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Mark-Up & Contingency */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center space-x-2 text-[#051C2C] pb-2 border-b border-[#E8E8E6]">
            <Percent className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold">Commercial Mark-Ups (C10 : C12)</h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Site Overhead Rate (r_oh)
                </label>
                <span className="text-xs font-mono font-bold text-[#051C2C]">
                  {formatPercent(inputs.overheadRate, 1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={inputs.overheadRate * 100}
                onChange={(e) => onChange({ overheadRate: parseFloat(e.target.value) / 100 })}
                className="w-full accent-[#2251FF]"
              />
              <span className="text-[11px] text-[#888888]">Site management, camp facilities, indirect staff</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contingency Risk Rate (r_cont)
                </label>
                <span className="text-xs font-mono font-bold text-[#051C2C]">
                  {formatPercent(inputs.contingencyRate, 1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={inputs.contingencyRate * 100}
                onChange={(e) => onChange({ contingencyRate: parseFloat(e.target.value) / 100 })}
                className="w-full accent-[#2251FF]"
              />
              <span className="text-[11px] text-[#888888]">Geological anomalies, overbreak variance reserve</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Target Profit Margin (r_prof)
                </label>
                <span className="text-xs font-mono font-bold text-[#2251FF]">
                  {formatPercent(inputs.profitMarginRate, 1)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="0.5"
                value={inputs.profitMarginRate * 100}
                onChange={(e) => onChange({ profitMarginRate: parseFloat(e.target.value) / 100 })}
                className="w-full accent-[#2251FF]"
              />
              <span className="text-[11px] text-[#888888]">Contractor gross target margin on production cost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Insights Block */}
      <div className="insight-block flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#051C2C]">
          <p className="font-semibold">Dynamic Calculation Flow & Integrity Guarantee</p>
          <p className="text-gray-600 leading-relaxed">
            All dimensional variables automatically populate the physical engine in <span className="font-mono text-[#2251FF]">05_Drill_Blast_Engine</span>.
            The Design Excavation Volume formula <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px] border border-[#E8E8E6]">V = L × A₀ × (1 + k_ob)</code> directly determines the explosive procurement weight, mucking truck cycle requirements, and initial shotcrete surface area.
          </p>
        </div>
      </div>
    </div>
  );
};
