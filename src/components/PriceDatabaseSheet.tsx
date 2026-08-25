import React, { useState } from 'react';
import { PriceDatabaseItem, ProjectInputs } from '../types';
import { formatCurrency } from '../utils/calculations';
import { exportPriceDatabaseCsv } from '../utils/storage';
import { Plus, Trash2, Download, Upload, Info, Filter, Sparkles } from 'lucide-react';

interface PriceDatabaseSheetProps {
  items: PriceDatabaseItem[];
  projectInputs: ProjectInputs;
  onUpdateItem: (id: string, updated: Partial<PriceDatabaseItem>) => void;
  onAddItem: (newItem: PriceDatabaseItem) => void;
  onDeleteItem: (id: string) => void;
  onOpenBulkCsv: () => void;
}

export const PriceDatabaseSheet: React.FC<PriceDatabaseSheetProps> = ({
  items,
  projectInputs,
  onUpdateItem,
  onAddItem,
  onDeleteItem,
  onOpenBulkCsv,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showAddRow, setShowAddRow] = useState<boolean>(false);

  const [newId, setNewId] = useState(`MAT-${String(items.length + 1).padStart(3, '0')}`);
  const [newCategory, setNewCategory] = useState('Ground Support');
  const [newName, setNewName] = useState('');
  const [newSpec, setNewSpec] = useState('');
  const [newUnit, setNewUnit] = useState('kg');
  const [newBaseRate, setNewBaseRate] = useState(10.0);
  const [newWasteRate, setNewWasteRate] = useState(0.05);

  const categories = ['ALL', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = selectedCategory === 'ALL'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const handleAddNew = () => {
    if (!newName.trim()) return;
    onAddItem({
      id: newId || `MAT-${String(Date.now()).slice(-3)}`,
      category: newCategory,
      name: newName,
      specification: newSpec || '-',
      unit: newUnit,
      baseUnitRate: Math.max(0, newBaseRate),
      wasteAllowanceRate: Math.max(0, newWasteRate),
    });
    setNewName('');
    setNewSpec('');
    setNewId(`MAT-${String(items.length + 2).padStart(3, '0')}`);
    setShowAddRow(false);
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 03
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Materials & Resource Rates Database
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Baseline procurement prices and site waste allowance matrix. Formulas across the BOQ and cost summary automatically reference effective unit rates.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => exportPriceDatabaseCsv(items)}
            className="h-8 px-3 rounded-lg text-xs font-medium text-gray-700 bg-white border border-[#E8E8E6] hover:bg-[#F5F5F2] transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenBulkCsv}
            className="h-8 px-3 rounded-lg text-xs font-medium text-gray-700 bg-white border border-[#E8E8E6] hover:bg-[#F5F5F2] transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-gray-600" />
            <span>Bulk CSV Import</span>
          </button>
          <button
            onClick={() => setShowAddRow(!showAddRow)}
            className="h-8 px-3 rounded-lg text-xs font-medium text-white bg-[#051C2C] hover:bg-[#051C2C]/90 transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#2251FF]" />
            <span>{showAddRow ? 'Cancel' : 'Add Material'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-[#888888] shrink-0" />
        <span className="text-xs text-[#888888] font-medium mr-1">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#051C2C] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-[#F5F5F2] border border-[#E8E8E6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Add New Row Form */}
      {showAddRow && (
        <div className="card p-5 bg-[#FAFAFA] border border-[#2251FF]/30 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold text-sm text-[#051C2C] flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#2251FF]" />
              <span>Define New Engineering Material</span>
            </span>
            <span className="text-[11px] text-[#888888]">Live dynamic array expansion</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">ID</label>
              <input
                type="text"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                className="w-full editable-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Category</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full editable-input text-xs"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Material Name</label>
              <input
                type="text"
                placeholder="e.g. Steel Fiber Shotcrete"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full editable-input text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Unit</label>
              <select
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="w-full editable-input text-xs"
              >
                <option value="kg">kg</option>
                <option value="pcs">pcs</option>
                <option value="m">m</option>
                <option value="m³">m³</option>
                <option value="ton">ton</option>
                <option value="set">set</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Base Rate ({projectInputs.currencyCode})</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={newBaseRate}
                onChange={(e) => setNewBaseRate(parseFloat(e.target.value) || 0)}
                className="w-full editable-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Waste (%)</label>
              <input
                type="number"
                step="1"
                min="0"
                max="50"
                value={(newWasteRate * 100).toFixed(0)}
                onChange={(e) => setNewWasteRate((parseFloat(e.target.value) || 0) / 100)}
                className="w-full editable-input text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setShowAddRow(false)}
              className="px-3 py-1.5 rounded text-xs text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNew}
              className="px-4 py-1.5 rounded text-xs font-medium text-white bg-[#2251FF] hover:bg-[#2251FF]/90 cursor-pointer shadow-xs"
            >
              Save & Append to Database
            </button>
          </div>
        </div>
      )}

      {/* Main Database Table */}
      <div className="card overflow-hidden bg-white border border-[#E8E8E6]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E8E8E6]">
                <th className="table-header-cell py-3 px-4 w-28">ID (Col A)</th>
                <th className="table-header-cell py-3 px-4 w-40">Category (Col B)</th>
                <th className="table-header-cell py-3 px-4">Material Name & Spec (Col C/D)</th>
                <th className="table-header-cell py-3 px-3 w-20 text-center">Unit (Col E)</th>
                <th className="table-header-cell py-3 px-4 w-36 text-right">Base Rate ({projectInputs.currencyCode})</th>
                <th className="table-header-cell py-3 px-4 w-32 text-right">Waste Rate (%)</th>
                <th className="table-header-cell py-3 px-4 w-40 text-right bg-[#2251FF]/5 text-[#2251FF]">
                  Effective Rate (Col H)
                </th>
                <th className="table-header-cell py-3 px-3 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E8E6] text-xs">
              {filteredItems.map((item) => {
                const effectiveRate = item.baseUnitRate * (1 + (item.wasteAllowanceRate || 0));

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#F5F5F2] transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-3 px-4 font-mono font-semibold text-[#051C2C]">
                      {item.id}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#F5F5F2] text-[#051C2C] border border-[#E8E8E6]">
                        {item.category}
                      </span>
                    </td>

                    {/* Name & Spec (Editable in-place) */}
                    <td className="py-3 px-4 space-y-1">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => onUpdateItem(item.id, { name: e.target.value })}
                        className="w-full editable-input text-xs font-medium"
                      />
                      <input
                        type="text"
                        value={item.specification}
                        onChange={(e) => onUpdateItem(item.id, { specification: e.target.value })}
                        className="w-full editable-input text-[11px] text-[#888888]"
                        placeholder="Specification notes..."
                      />
                    </td>

                    {/* Unit */}
                    <td className="py-3 px-3 text-center">
                      <select
                        value={item.unit}
                        onChange={(e) => onUpdateItem(item.id, { unit: e.target.value })}
                        className="editable-input text-xs text-center px-1"
                      >
                        <option value="kg">kg</option>
                        <option value="pcs">pcs</option>
                        <option value="m">m</option>
                        <option value="m³">m³</option>
                        <option value="ton">ton</option>
                        <option value="set">set</option>
                      </select>
                    </td>

                    {/* Base Unit Rate (Editable) */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span className="text-gray-400 font-mono">{projectInputs.currencyCode}</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.baseUnitRate}
                          onChange={(e) =>
                            onUpdateItem(item.id, {
                              baseUnitRate: Math.max(0, parseFloat(e.target.value) || 0),
                            })
                          }
                          className="w-24 editable-input text-right font-mono font-semibold"
                        />
                      </div>
                    </td>

                    {/* Waste Allowance Rate (Editable) */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="100"
                          value={(item.wasteAllowanceRate * 100).toFixed(1)}
                          onChange={(e) =>
                            onUpdateItem(item.id, {
                              wasteAllowanceRate: (parseFloat(e.target.value) || 0) / 100,
                            })
                          }
                          className="w-16 editable-input text-right font-mono"
                        />
                        <span className="text-gray-400 font-mono">%</span>
                      </div>
                    </td>

                    {/* Effective Rate (Calculated Spill Formula) */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#2251FF] bg-[#2251FF]/5">
                      {formatCurrency(effectiveRate, projectInputs.currencyCode, 2)}
                    </td>

                    {/* Delete action */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="text-gray-300 hover:text-[#D32F2F] transition-colors p-1 rounded cursor-pointer"
                        title="Delete Material Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Rule Insights */}
      <div className="insight-block flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#051C2C]">
          <p className="font-semibold">Zero-Maintenance Formula Implementation</p>
          <p className="text-gray-600 leading-relaxed">
            Effective Unit Rate formula is computed via <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px] border border-[#E8E8E6]">Effective_Rate = Base_Rate × (1 + Waste_Rate)</code>.
            When you add new materials or update procurement prices, all downstream Bill of Quantities (<span className="font-mono text-[#2251FF]">06_Material_BOQ</span>) lines and executive cost summaries re-calculate instantly in memory.
          </p>
        </div>
      </div>
    </div>
  );
};
