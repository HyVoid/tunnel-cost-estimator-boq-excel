import React, { useState } from 'react';
import { EquipmentRateItem, LaborRateItem, ProjectInputs } from '../types';
import { formatCurrency } from '../utils/calculations';
import { Truck, Users, Plus, Trash2, Info, Sparkles, Wrench } from 'lucide-react';

interface ResourceRatesSheetProps {
  equipmentRates: EquipmentRateItem[];
  laborRates: LaborRateItem[];
  projectInputs: ProjectInputs;
  onUpdateEquipment: (id: string, updated: Partial<EquipmentRateItem>) => void;
  onAddEquipment: (newItem: EquipmentRateItem) => void;
  onDeleteEquipment: (id: string) => void;
  onUpdateLabor: (id: string, updated: Partial<LaborRateItem>) => void;
  onAddLabor: (newItem: LaborRateItem) => void;
  onDeleteLabor: (id: string) => void;
}

export const ResourceRatesSheet: React.FC<ResourceRatesSheetProps> = ({
  equipmentRates,
  laborRates,
  projectInputs,
  onUpdateEquipment,
  onAddEquipment,
  onDeleteEquipment,
  onUpdateLabor,
  onAddLabor,
  onDeleteLabor,
}) => {
  const [showAddEqp, setShowAddEqp] = useState(false);
  const [newEqpId, setNewEqpId] = useState(`EQP-${String(equipmentRates.length + 1).padStart(3, '0')}`);
  const [newEqpCat, setNewEqpCat] = useState('Auxiliary & Services');
  const [newEqpName, setNewEqpName] = useState('');
  const [newEqpBaseRate, setNewEqpBaseRate] = useState(50.0);
  const [newEqpOpCost, setNewEqpOpCost] = useState(30.0);

  const [showAddLab, setShowAddLab] = useState(false);
  const [newLabId, setNewLabId] = useState(`LAB-${String(laborRates.length + 1).padStart(3, '0')}`);
  const [newLabRole, setNewLabRole] = useState('');
  const [newLabWage, setNewLabWage] = useState(30.0);
  const [newLabAllowance, setNewLabAllowance] = useState(0.20);
  const [newLabCrewSize, setNewLabCrewSize] = useState(2);

  const totalCrewSize = laborRates.reduce((acc, curr) => acc + (curr.crewSizePerShift || 0), 0);
  const totalBaseEqpCost = equipmentRates.reduce((acc, curr) => acc + curr.baseHourlyRate + curr.operatingCostPerHour, 0);

  const totalWeightedWageSum = laborRates.reduce(
    (acc, curr) => acc + curr.baseHourlyWage * (1 + curr.allowanceOvertimeRate) * curr.crewSizePerShift,
    0
  );
  const weightedAvgWage = totalCrewSize > 0 ? totalWeightedWageSum / totalCrewSize : 0;

  const handleAddEquipment = () => {
    if (!newEqpName.trim()) return;
    onAddEquipment({
      id: newEqpId || `EQP-${String(Date.now()).slice(-3)}`,
      category: newEqpCat,
      name: newEqpName,
      baseHourlyRate: Math.max(0, newEqpBaseRate),
      operatingCostPerHour: Math.max(0, newEqpOpCost),
    });
    setNewEqpName('');
    setNewEqpId(`EQP-${String(equipmentRates.length + 2).padStart(3, '0')}`);
    setShowAddEqp(false);
  };

  const handleAddLabor = () => {
    if (!newLabRole.trim()) return;
    onAddLabor({
      id: newLabId || `LAB-${String(Date.now()).slice(-3)}`,
      roleName: newLabRole,
      baseHourlyWage: Math.max(0, newLabWage),
      allowanceOvertimeRate: Math.max(0, newLabAllowance),
      crewSizePerShift: Math.max(1, newLabCrewSize),
    });
    setNewLabRole('');
    setNewLabId(`LAB-${String(laborRates.length + 2).padStart(3, '0')}`);
    setShowAddLab(false);
  };

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 04
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Equipment Fleet & Tunnel Crew Resource Rates
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Standard hourly ownership, fuel/power operating tariffs for plant, and underground labor shift wage structure.
          </p>
        </div>

        {/* Live Key Metrics */}
        <div className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-xs border border-[#E8E8E6]">
          <div className="border-r border-[#E8E8E6] pr-3">
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Standard Shift Crew</div>
            <div className="text-lg font-display font-bold text-[#051C2C]">
              {totalCrewSize} <span className="text-xs font-sans text-[#888888] font-normal">personnel</span>
            </div>
          </div>
          <div className="border-r border-[#E8E8E6] pr-3">
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Avg Effective Wage</div>
            <div className="text-lg font-display font-bold text-[#2251FF]">
              {formatCurrency(weightedAvgWage, projectInputs.currencyCode, 2)} <span className="text-xs font-sans text-[#888888] font-normal">/ hr</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Total Plant Burn</div>
            <div className="text-lg font-display font-bold text-[#051C2C]">
              {formatCurrency(totalBaseEqpCost, projectInputs.currencyCode, 2)} <span className="text-xs font-sans text-[#888888] font-normal">/ hr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Section A: Equipment Rates Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#2251FF]" />
              <h2 className="font-display text-base font-semibold text-[#051C2C]">
                Section A: Equipment Machine Rates (A3 : F100)
              </h2>
            </div>
            <button
              onClick={() => setShowAddEqp(!showAddEqp)}
              className="px-2.5 py-1 rounded text-xs font-medium text-white bg-[#051C2C] hover:bg-[#051C2C]/90 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-[#2251FF]" />
              <span>{showAddEqp ? 'Cancel' : 'Add Machine'}</span>
            </button>
          </div>

          {showAddEqp && (
            <div className="card p-4 bg-[#FAFAFA] border border-[#2251FF]/30 space-y-3">
              <div className="text-xs font-semibold text-[#051C2C] flex items-center space-x-1">
                <Wrench className="w-3.5 h-3.5 text-[#2251FF]" />
                <span>Add Equipment Machine</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">ID</label>
                  <input
                    type="text"
                    value={newEqpId}
                    onChange={(e) => setNewEqpId(e.target.value)}
                    className="w-full editable-input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Category</label>
                  <input
                    type="text"
                    value={newEqpCat}
                    onChange={(e) => setNewEqpCat(e.target.value)}
                    className="w-full editable-input text-xs"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Equipment Name</label>
                  <input
                    type="text"
                    value={newEqpName}
                    placeholder="e.g. Tunnel Dumper 30t"
                    onChange={(e) => setNewEqpName(e.target.value)}
                    className="w-full editable-input text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Base Hourly Rate</label>
                  <input
                    type="number"
                    value={newEqpBaseRate}
                    onChange={(e) => setNewEqpBaseRate(parseFloat(e.target.value) || 0)}
                    className="w-full editable-input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Operating Cost/hr</label>
                  <input
                    type="number"
                    value={newEqpOpCost}
                    onChange={(e) => setNewEqpOpCost(parseFloat(e.target.value) || 0)}
                    className="w-full editable-input text-xs font-mono"
                  />
                </div>
                <div className="col-span-2 flex items-end justify-end space-x-2">
                  <button
                    onClick={() => setShowAddEqp(false)}
                    className="px-3 py-1 text-xs text-gray-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEquipment}
                    className="px-3 py-1 bg-[#2251FF] text-white text-xs rounded cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="card overflow-hidden bg-white border border-[#E8E8E6]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E8E6]">
                    <th className="table-header-cell py-3 px-3 w-20">ID</th>
                    <th className="table-header-cell py-3 px-3">Equipment Name & Category</th>
                    <th className="table-header-cell py-3 px-3 w-24 text-right">Base / hr</th>
                    <th className="table-header-cell py-3 px-3 w-24 text-right">Op Cost / hr</th>
                    <th className="table-header-cell py-3 px-3 w-28 text-right bg-[#2251FF]/5 text-[#2251FF]">
                      Total / hr
                    </th>
                    <th className="table-header-cell py-3 px-2 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6] text-xs">
                  {equipmentRates.map((item) => {
                    const totalRate = item.baseHourlyRate + item.operatingCostPerHour;

                    return (
                      <tr key={item.id} className="hover:bg-[#F5F5F2] transition-colors">
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#051C2C]">
                          {item.id}
                        </td>
                        <td className="py-2.5 px-3 space-y-0.5">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => onUpdateEquipment(item.id, { name: e.target.value })}
                            className="w-full editable-input text-xs font-medium"
                          />
                          <span className="text-[10px] text-[#888888] block">{item.category}</span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <input
                            type="number"
                            step="1"
                            min="0"
                            value={item.baseHourlyRate}
                            onChange={(e) =>
                              onUpdateEquipment(item.id, {
                                baseHourlyRate: Math.max(0, parseFloat(e.target.value) || 0),
                              })
                            }
                            className="w-18 editable-input text-right text-xs font-mono"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <input
                            type="number"
                            step="1"
                            min="0"
                            value={item.operatingCostPerHour}
                            onChange={(e) =>
                              onUpdateEquipment(item.id, {
                                operatingCostPerHour: Math.max(0, parseFloat(e.target.value) || 0),
                              })
                            }
                            className="w-18 editable-input text-right text-xs font-mono"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#2251FF] bg-[#2251FF]/5">
                          {formatCurrency(totalRate, projectInputs.currencyCode, 2)}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            onClick={() => onDeleteEquipment(item.id)}
                            className="text-gray-300 hover:text-[#D32F2F] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Section B: Labor Rates & Crew Structure Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-[#2251FF]" />
              <h2 className="font-display text-base font-semibold text-[#051C2C]">
                Section B: Crew Labor Rates (H3 : M100)
              </h2>
            </div>
            <button
              onClick={() => setShowAddLab(!showAddLab)}
              className="px-2.5 py-1 rounded text-xs font-medium text-white bg-[#051C2C] hover:bg-[#051C2C]/90 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-[#2251FF]" />
              <span>{showAddLab ? 'Cancel' : 'Add Role'}</span>
            </button>
          </div>

          {showAddLab && (
            <div className="card p-4 bg-[#FAFAFA] border border-[#2251FF]/30 space-y-3">
              <div className="text-xs font-semibold text-[#051C2C] flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-[#2251FF]" />
                <span>Add Crew Labor Role</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Role ID</label>
                  <input
                    type="text"
                    value={newLabId}
                    onChange={(e) => setNewLabId(e.target.value)}
                    className="w-full editable-input text-xs font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Role Name</label>
                  <input
                    type="text"
                    value={newLabRole}
                    placeholder="e.g. Electrician / Mechanic"
                    onChange={(e) => setNewLabRole(e.target.value)}
                    className="w-full editable-input text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Base Wage</label>
                  <input
                    type="number"
                    value={newLabWage}
                    onChange={(e) => setNewLabWage(parseFloat(e.target.value) || 0)}
                    className="w-full editable-input text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-semibold text-gray-500">Allowance %</label>
                  <input
                    type="number"
                    value={(newLabAllowance * 100).toFixed(0)}
                    onChange={(e) => setNewLabAllowance((parseFloat(e.target.value) || 0) / 100)}
                    className="w-full editable-input text-xs font-mono"
                  />
                </div>
                <div className="col-span-5 flex items-end justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <label className="text-[11px] font-semibold text-gray-700">Crew size per shift:</label>
                    <input
                      type="number"
                      min="1"
                      value={newLabCrewSize}
                      onChange={(e) => setNewLabCrewSize(parseInt(e.target.value) || 1)}
                      className="w-16 editable-input text-xs font-mono"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowAddLab(false)}
                      className="px-3 py-1 text-xs text-gray-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddLabor}
                      className="px-3 py-1 bg-[#2251FF] text-white text-xs rounded cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card overflow-hidden bg-white border border-[#E8E8E6]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E8E6]">
                    <th className="table-header-cell py-3 px-3 w-16">ID</th>
                    <th className="table-header-cell py-3 px-3">Role Name</th>
                    <th className="table-header-cell py-3 px-3 w-20 text-right">Base Wage</th>
                    <th className="table-header-cell py-3 px-3 w-20 text-right">Allow. (%)</th>
                    <th className="table-header-cell py-3 px-3 w-24 text-right bg-[#2251FF]/5 text-[#2251FF]">
                      Eff. Wage
                    </th>
                    <th className="table-header-cell py-3 px-3 w-18 text-center">Crew Size</th>
                    <th className="table-header-cell py-3 px-2 w-8 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6] text-xs">
                  {laborRates.map((role) => {
                    const effectiveWage = role.baseHourlyWage * (1 + (role.allowanceOvertimeRate || 0));

                    return (
                      <tr key={role.id} className="hover:bg-[#F5F5F2] transition-colors">
                        <td className="py-2.5 px-3 font-mono font-semibold text-[#051C2C]">
                          {role.id}
                        </td>
                        <td className="py-2.5 px-3">
                          <input
                            type="text"
                            value={role.roleName}
                            onChange={(e) => onUpdateLabor(role.id, { roleName: e.target.value })}
                            className="w-full editable-input text-xs font-medium"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <input
                            type="number"
                            step="1"
                            min="0"
                            value={role.baseHourlyWage}
                            onChange={(e) =>
                              onUpdateLabor(role.id, {
                                baseHourlyWage: Math.max(0, parseFloat(e.target.value) || 0),
                              })
                            }
                            className="w-16 editable-input text-right text-xs font-mono"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <input
                            type="number"
                            step="5"
                            min="0"
                            value={(role.allowanceOvertimeRate * 100).toFixed(0)}
                            onChange={(e) =>
                              onUpdateLabor(role.id, {
                                allowanceOvertimeRate: (parseFloat(e.target.value) || 0) / 100,
                              })
                            }
                            className="w-14 editable-input text-right text-xs font-mono"
                          />
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#2251FF] bg-[#2251FF]/5">
                          {formatCurrency(effectiveWage, projectInputs.currencyCode, 2)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <input
                            type="number"
                            step="1"
                            min="1"
                            value={role.crewSizePerShift}
                            onChange={(e) =>
                              onUpdateLabor(role.id, {
                                crewSizePerShift: Math.max(1, parseInt(e.target.value) || 1),
                              })
                            }
                            className="w-12 editable-input text-center text-xs font-mono font-semibold"
                          />
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <button
                            onClick={() => onDeleteLabor(role.id)}
                            className="text-gray-300 hover:text-[#D32F2F] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Resource Insights */}
      <div className="insight-block flex items-start space-x-3">
        <Info className="w-5 h-5 text-[#2251FF] shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-[#051C2C]">
          <p className="font-semibold">Decoupled Cost Engineering Architecture</p>
          <p className="text-gray-600 leading-relaxed">
            Equipment rates separate fixed depreciation from variable operating fuel/maintenance costs.
            Labor effective wages integrate underground hazard and overtime allowances via <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[11px] border border-[#E8E8E6]">Effective_Wage = Base_Wage × (1 + Allowance_Rate)</code>. Total labor cost in <span className="font-mono text-[#2251FF]">07_Cost_Summary_Analysis</span> calculates the product of cycle operating hours and active shift crew size.
          </p>
        </div>
      </div>
    </div>
  );
};
