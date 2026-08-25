import React, { useState } from 'react';
import { CostSummary, ProjectInputs, ComputedEngine } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../utils/calculations';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Building,
  HardHat,
  Info,
} from 'lucide-react';

interface CostSummarySheetProps {
  costSummary: CostSummary;
  projectInputs: ProjectInputs;
  engine: ComputedEngine;
  onUpdateInputs: (updated: Partial<ProjectInputs>) => void;
}

export const CostSummarySheet: React.FC<CostSummarySheetProps> = ({
  costSummary: c,
  projectInputs: p,
  engine,
  onUpdateInputs,
}) => {
  const breakdown = c.categoryBreakdown;

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 07
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Executive Cost Summary & Commercial Dashboard
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Consolidating direct production costs, site indirects, contingency reserves, and unit performance indicators.
          </p>
        </div>

        {/* Hero Contract Price - Light-First Surface */}
        <div className="bg-white text-[#051C2C] p-4 rounded-xl shadow-md flex items-center space-x-4 border border-[#E8E8E6]">
          <div className="p-2.5 rounded-lg bg-[#2251FF]/10 text-[#2251FF]">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#888888] font-semibold font-mono">
              Target Contract Price (Bid Total)
            </div>
            <div className="text-2xl font-display font-bold text-[#051C2C] tracking-tight">
              {formatCurrency(c.totalContractPrice, p.currencyCode, 2)}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Unit Indicators Cards - Apple HIG Layered Elevation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cost per linear meter */}
        <div className="card p-5 space-y-1 bg-white border border-[#E8E8E6]">
          <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold">
            Unit Cost per Meter
          </span>
          <div className="text-2xl font-display font-bold text-[#051C2C] kpi-number">
            {formatCurrency(c.costPerMeter, p.currencyCode, 2)}
            <span className="text-xs font-sans text-[#888888] font-normal ml-1">/ m</span>
          </div>
          <p className="text-[11px] text-[#888888]">Benchmark for tender comparison</p>
        </div>

        {/* Cost per cubic meter */}
        <div className="card p-5 space-y-1 bg-white border border-[#E8E8E6]">
          <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold">
            Unit Cost per m³ Blasted
          </span>
          <div className="text-2xl font-display font-bold text-[#051C2C] kpi-number">
            {formatCurrency(c.costPerCubic, p.currencyCode, 2)}
            <span className="text-xs font-sans text-[#888888] font-normal ml-1">/ m³</span>
          </div>
          <p className="text-[11px] text-[#888888]">Solid volume with design overbreak</p>
        </div>

        {/* Direct Cost Ratio */}
        <div className="card p-5 space-y-1 bg-white border border-[#E8E8E6]">
          <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold">
            Direct Cost Share
          </span>
          <div className="text-2xl font-display font-bold text-[#051C2C] kpi-number">
            {formatPercent(c.directCostRatio, 1)}
          </div>
          <p className="text-[11px] text-[#888888]">Materials, plant, and labor direct intensity</p>
        </div>

        {/* Target Profit Amount */}
        <div className="card p-5 space-y-1 bg-white border border-[#E8E8E6]">
          <span className="text-[11px] uppercase tracking-wider text-[#888888] font-semibold">
            Gross Profit Margin
          </span>
          <div className="text-2xl font-display font-bold text-[#051C2C] kpi-number">
            {formatCurrency(c.targetProfitAmount, p.currencyCode, 2)}
          </div>
          <p className="text-[11px] text-[#888888]">{formatPercent(p.profitMarginRate, 1)} mark-up on total production</p>
        </div>
      </div>

      {/* Visual Cost Composition Stacked Bar */}
      <div className="card p-6 bg-white space-y-4 border border-[#E8E8E6]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <PieChart className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold text-[#051C2C]">
              Commercial Cost Structure Breakdown
            </h2>
          </div>
          <span className="text-xs text-[#888888] font-mono">100% Comprehensive Bid Distribution</span>
        </div>

        {/* Multi-segmented distribution bar */}
        <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden flex shadow-xs border border-[#E8E8E6]">
          <div
            className="bg-[#2251FF] h-full flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-all duration-300"
            style={{ width: `${breakdown.materialsPercent}%` }}
            title={`Materials: ${breakdown.materialsPercent.toFixed(1)}%`}
          >
            {breakdown.materialsPercent > 10 && `Mat ${breakdown.materialsPercent.toFixed(0)}%`}
          </div>
          <div
            className="bg-[#051C2C] h-full flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-all duration-300"
            style={{ width: `${breakdown.equipmentPercent}%` }}
            title={`Equipment: ${breakdown.equipmentPercent.toFixed(1)}%`}
          >
            {breakdown.equipmentPercent > 8 && `Eqp ${breakdown.equipmentPercent.toFixed(0)}%`}
          </div>
          <div
            className="bg-[#4F46E5] h-full flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-all duration-300"
            style={{ width: `${breakdown.laborPercent}%` }}
            title={`Labor: ${breakdown.laborPercent.toFixed(1)}%`}
          >
            {breakdown.laborPercent > 8 && `Lab ${breakdown.laborPercent.toFixed(0)}%`}
          </div>
          <div
            className="bg-[#64748B] h-full flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-all duration-300"
            style={{ width: `${breakdown.overheadPercent}%` }}
            title={`Overhead: ${breakdown.overheadPercent.toFixed(1)}%`}
          >
            {breakdown.overheadPercent > 6 && `O/H ${breakdown.overheadPercent.toFixed(0)}%`}
          </div>
          <div
            className="bg-[#94A3B8] h-full flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-all duration-300"
            style={{ width: `${breakdown.contingencyPercent}%` }}
            title={`Contingency: ${breakdown.contingencyPercent.toFixed(1)}%`}
          >
            {breakdown.contingencyPercent > 6 && `Cont ${breakdown.contingencyPercent.toFixed(0)}%`}
          </div>
          <div
            className="bg-[#0D9488] h-full flex items-center justify-center text-white text-[11px] font-mono font-semibold transition-all duration-300"
            style={{ width: `${breakdown.profitPercent}%` }}
            title={`Target Profit: ${breakdown.profitPercent.toFixed(1)}%`}
          >
            {breakdown.profitPercent > 6 && `Profit ${breakdown.profitPercent.toFixed(0)}%`}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#2251FF]" />
            <span className="text-gray-600">Materials ({breakdown.materialsPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#051C2C]" />
            <span className="text-gray-600">Equipment ({breakdown.equipmentPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#4F46E5]" />
            <span className="text-gray-600">Labor ({breakdown.laborPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#64748B]" />
            <span className="text-gray-600">Site O/H ({breakdown.overheadPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#94A3B8]" />
            <span className="text-gray-600">Contingency ({breakdown.contingencyPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#0D9488]" />
            <span className="text-gray-600">Profit ({breakdown.profitPercent.toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* Main Breakdown Tables (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Direct Construction Costs Table */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E6]">
            <div className="flex items-center space-x-2 text-[#051C2C]">
              <HardHat className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-display text-base font-semibold">
                Direct Construction Costs (A3 : D8)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#888888]">BOQ & Resource Link</span>
          </div>

          <table className="w-full text-xs">
            <tbody className="divide-y divide-[#E8E8E6]">
              <tr>
                <td className="py-2.5 text-gray-600">
                  <div className="font-medium text-[#051C2C]">1. Direct Materials Expenditure (C3)</div>
                  <div className="text-[11px] text-[#888888]">Aggregated from 06_Material_BOQ</div>
                </td>
                <td className="py-2.5 text-right font-mono font-semibold text-gray-800">
                  {formatCurrency(c.materialCost, p.currencyCode, 2)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-600">
                  <div className="font-medium text-[#051C2C]">2. Plant & Equipment Fleet Cost (C4)</div>
                  <div className="text-[11px] text-[#888888]">Jumbo, mucking loader, shotcrete rig, aux</div>
                </td>
                <td className="py-2.5 text-right font-mono font-semibold text-gray-800">
                  {formatCurrency(c.equipmentCost, p.currencyCode, 2)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-600">
                  <div className="font-medium text-[#051C2C]">3. Underground Labor Payroll (C5)</div>
                  <div className="text-[11px] text-[#888888]">Drill & blast shift crew effective wages</div>
                </td>
                <td className="py-2.5 text-right font-mono font-semibold text-gray-800">
                  {formatCurrency(c.labourCost, p.currencyCode, 2)}
                </td>
              </tr>
              <tr className="bg-[#F5F5F2] font-semibold text-sm">
                <td className="py-3 px-2 text-[#051C2C] font-display">
                  Direct Cost Subtotal (C6 = C3 + C4 + C5)
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold text-[#051C2C]">
                  {formatCurrency(c.directCostSubtotal, p.currencyCode, 2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Commercial Mark-Ups & Final Tender Price */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8E6]">
            <div className="flex items-center space-x-2 text-[#051C2C]">
              <Building className="w-4 h-4 text-[#2251FF]" />
              <h3 className="font-display text-base font-semibold">
                Commercial Mark-Ups & Contract Price (A10 : D15)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#888888]">Commercial Parameters</span>
          </div>

          <table className="w-full text-xs">
            <tbody className="divide-y divide-[#E8E8E6]">
              <tr>
                <td className="py-2.5 text-gray-600">
                  <div className="font-medium text-[#051C2C]">
                    Site Management & Overhead (C10)
                  </div>
                  <div className="text-[11px] text-[#888888]">
                    {formatPercent(p.overheadRate, 1)} × Direct Cost
                  </div>
                </td>
                <td className="py-2.5 text-right font-mono font-semibold text-gray-800">
                  {formatCurrency(c.siteOverheadCost, p.currencyCode, 2)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-600">
                  <div className="font-medium text-[#051C2C]">
                    Contingency & Risk Allowance (C11)
                  </div>
                  <div className="text-[11px] text-[#888888]">
                    {formatPercent(p.contingencyRate, 1)} × Direct Cost
                  </div>
                </td>
                <td className="py-2.5 text-right font-mono font-semibold text-gray-800">
                  {formatCurrency(c.contingencyCost, p.currencyCode, 2)}
                </td>
              </tr>
              <tr className="bg-[#F5F5F2] font-semibold">
                <td className="py-2.5 px-2 text-[#051C2C]">
                  Total Project Production Cost (C12)
                </td>
                <td className="py-2.5 px-2 text-right font-mono font-bold text-[#051C2C]">
                  {formatCurrency(c.totalProductionCost, p.currencyCode, 2)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-gray-600">
                  <div className="font-medium text-[#051C2C]">
                    Contractor Target Gross Profit (C13)
                  </div>
                  <div className="text-[11px] text-[#888888]">
                    {formatPercent(p.profitMarginRate, 1)} × Total Production Cost
                  </div>
                </td>
                <td className="py-2.5 text-right font-mono font-semibold text-[#051C2C]">
                  {formatCurrency(c.targetProfitAmount, p.currencyCode, 2)}
                </td>
              </tr>
              <tr className="bg-[#2251FF]/5 border-t-2 border-[#2251FF] text-sm">
                <td className="py-3 px-2 font-display font-bold text-[#051C2C]">
                  Final Bid Price / Contract Total (C14)
                </td>
                <td className="py-3 px-2 text-right font-mono font-bold text-[#2251FF]">
                  {formatCurrency(c.totalContractPrice, p.currencyCode, 2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Commercial Decision & Formula Proof Insight */}
      <div className="insight-block flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#051C2C]">
          <p className="font-semibold">Mathematical Formula Proof & Bid Reconciliation</p>
          <p className="text-[#888888] leading-relaxed font-mono text-[11px]">
            Contract Price = Direct Cost × (1 + r_overhead + r_contingency) × (1 + r_margin)
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every dollar in direct material savings or drill efficiency propagates directly to contract bid competitiveness while strictly preserving commercial risk reserves.
          </p>
        </div>
      </div>
    </div>
  );
};
