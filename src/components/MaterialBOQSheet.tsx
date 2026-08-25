import React from 'react';
import { BOQItem, ProjectInputs } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculations';
import { exportBOQCsv } from '../utils/storage';
import { Download, Layers, ShieldCheck, Bomb, Wrench, Info, Printer } from 'lucide-react';

interface MaterialBOQSheetProps {
  boqItems: BOQItem[];
  totalMaterialCost: number;
  projectInputs: ProjectInputs;
}

export const MaterialBOQSheet: React.FC<MaterialBOQSheetProps> = ({
  boqItems,
  totalMaterialCost,
  projectInputs: p,
}) => {
  // Group by category for quick high-level cost cards
  const categoryTotals: Record<string, number> = {};
  boqItems.forEach((item) => {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.totalCost;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 06
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Material Bill of Quantities (BOQ) & Procurement Plan
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Synthesized Bill of Quantities with dynamic MAP / SWITCH engine linkage. Quantities link to physical calculations, prices link to price databases.
          </p>
        </div>

        {/* Total Cost Badge & Export */}
        <div className="flex items-center space-x-3">
          <div className="bg-white p-3 rounded-xl shadow-xs border border-[#E8E8E6] text-right">
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium">Total Material Budget</div>
            <div className="text-xl font-display font-bold text-[#2251FF]">
              {formatCurrency(totalMaterialCost, p.currencyCode, 2)}
            </div>
          </div>

          <button
            onClick={() => exportBOQCsv(boqItems, p.currencyCode)}
            className="h-10 px-3.5 rounded-xl text-xs font-medium text-white bg-[#051C2C] hover:bg-[#051C2C]/90 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>Export BOQ</span>
          </button>

          <button
            onClick={handlePrint}
            className="h-10 px-3 rounded-xl text-xs font-medium text-gray-700 bg-white border border-[#E8E8E6] hover:bg-gray-50 transition-colors flex items-center space-x-1 cursor-pointer shadow-xs"
            title="Print BOQ"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Cost Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(categoryTotals).map(([cat, cost]) => {
          const share = totalMaterialCost > 0 ? (cost / totalMaterialCost) * 100 : 0;
          let Icon = Layers;
          if (cat.toLowerCase().includes('explosive')) Icon = Bomb;
          else if (cat.toLowerCase().includes('support')) Icon = ShieldCheck;
          else if (cat.toLowerCase().includes('drill')) Icon = Wrench;

          return (
            <div key={cat} className="card p-4 space-y-2 bg-white border border-[#E8E8E6]">
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-xs font-semibold text-gray-700 truncate">{cat}</span>
                <Icon className="w-4 h-4 text-[#2251FF]" />
              </div>
              <div className="text-lg font-display font-bold text-[#051C2C]">
                {formatCurrency(cost, p.currencyCode, 2)}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#888888] font-mono">
                  <span>Share of Material Budget</span>
                  <span>{share.toFixed(1)}%</span>
                </div>
                <div className="data-bar-track">
                  <div className="data-bar-fill" style={{ width: `${Math.min(100, Math.max(0, share))}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main BOQ Table */}
      <div className="card overflow-hidden bg-white border border-[#E8E8E6]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E6]">
                <th className="table-header-cell py-3 px-4 w-28">Item ID (A)</th>
                <th className="table-header-cell py-3 px-4 w-40">Category (B)</th>
                <th className="table-header-cell py-3 px-4">Material Name & Specification (C/D)</th>
                <th className="table-header-cell py-3 px-3 w-16 text-center">Unit (E)</th>
                <th className="table-header-cell py-3 px-4 w-32 text-right">BOQ Qty (F)</th>
                <th className="table-header-cell py-3 px-4 w-32 text-right">Eff. Rate (G)</th>
                <th className="table-header-cell py-3 px-4 w-40 text-right bg-[#2251FF]/5 text-[#2251FF]">
                  Total Cost (H)
                </th>
                <th className="table-header-cell py-3 px-4 w-36 text-right">Cost Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-xs">
              {boqItems.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-[#F5F5F2] transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-[#051C2C]">
                      {item.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F5F5F2] text-[#051C2C] border border-[#E8E8E6]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-800">{item.name}</div>
                      <div className="text-[11px] text-[#888888]">{item.specification}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-medium text-gray-600">
                      {item.unit}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-800">
                      {formatNumber(item.quantity, item.unit === 'pcs' || item.unit === 'set' ? 0 : 2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-gray-600">
                      {formatCurrency(item.effectiveUnitRate, p.currencyCode, 2)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#2251FF] bg-[#2251FF]/5">
                      {formatCurrency(item.totalCost, p.currencyCode, 2)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="space-y-1 w-28 ml-auto">
                        <span className="text-[11px] font-mono text-[#051C2C] block">
                          {item.costSharePercent.toFixed(1)}%
                        </span>
                        <div className="data-bar-track">
                          <div
                            className="data-bar-fill"
                            style={{ width: `${Math.min(100, Math.max(0, item.costSharePercent))}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#F5F5F2] border-t-2 border-[#051C2C] font-semibold text-xs text-[#051C2C]">
                <td colSpan={6} className="py-3.5 px-4 text-right uppercase tracking-wider font-display text-sm">
                  Total Material Procurement Expenditure (Subtotal)
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm font-bold text-[#2251FF]">
                  {formatCurrency(totalMaterialCost, p.currencyCode, 2)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-xs">100.0%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Engineering Insights */}
      <div className="insight-block flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#051C2C]">
          <p className="font-semibold">Automated Procurement Synchronization</p>
          <p className="text-gray-600 leading-relaxed">
            The BOQ table separates physical engineering demand (Quantity) from commercial unit rates (Cost). Any adjustment in advance rate, rock bolt grid spacing, or explosive charge density updates these lines synchronously, providing procurement managers with exact bill quantities for contractor tenders and supplier purchase orders.
          </p>
        </div>
      </div>
    </div>
  );
};
