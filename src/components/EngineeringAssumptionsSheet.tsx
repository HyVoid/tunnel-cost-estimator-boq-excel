import React from 'react';
import { EngineeringAssumptions, ProjectInputs, ComputedEngine } from '../types';
import { formatNumber } from '../utils/calculations';
import { Bomb, ShieldCheck, Activity } from 'lucide-react';

interface EngineeringAssumptionsSheetProps {
  assumptions: EngineeringAssumptions;
  projectInputs: ProjectInputs;
  engine: ComputedEngine;
  onChange: (updated: Partial<EngineeringAssumptions>) => void;
}

export const EngineeringAssumptionsSheet: React.FC<EngineeringAssumptionsSheetProps> = ({
  assumptions: a,
  projectInputs: p,
  engine,
  onChange,
}) => {
  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 02
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Drill & Blast and Rock Support Assumptions
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Technical construction assumptions governing round geometry, explosive consumption, drill steel depreciation, and primary rock support density.
          </p>
        </div>

        {/* Live Cycle Summary Badge */}
        <div className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-xs border border-[#E8E8E6]">
          <div className="border-r border-[#E8E8E6] pr-3">
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Total Heading Cycles</div>
            <div className="text-lg font-display font-bold text-[#2251FF]">
              {formatNumber(engine.totalCycles, 0, 'rounds')}
            </div>
          </div>
          <div className="border-r border-[#E8E8E6] pr-3">
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Vol / Round (w/ Overbreak)</div>
            <div className="text-lg font-display font-bold text-[#051C2C]">
              {formatNumber(engine.volumePerCycle, 2, 'm³')}
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#888888] font-medium font-mono">Drill Length / Round</div>
            <div className="text-lg font-display font-bold text-[#051C2C]">
              {formatNumber(engine.drillingMetersPerCycle, 1, 'm')}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Technical Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blasting Design Parameters */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center space-x-2 text-[#051C2C] pb-2 border-b border-[#E8E8E6]">
            <Bomb className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold">Drill & Blast Design (C4 : C9)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Advance / Pull Length (l_pull)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="6.0"
                value={a.pullLength}
                onChange={(e) => onChange({ pullLength: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Effective excavation advance per cycle</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Holes per Round (N_holes)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">count</span>
              </div>
              <input
                type="number"
                step="1"
                min="10"
                value={a.holesPerRound}
                onChange={(e) => onChange({ holesPerRound: Math.max(1, parseInt(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Cut, easer, stoping & contour holes</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Single Hole Depth (l_hole)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={a.holeDepth}
                onChange={(e) => onChange({ holeDepth: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Total drilled length per blasthole</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Powder Factor (PF)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">kg / m³ solid</span>
              </div>
              <input
                type="number"
                step="0.05"
                min="0.2"
                value={a.powderFactor}
                onChange={(e) => onChange({ powderFactor: Math.max(0.01, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Explosive specific charge consumption</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Detonators per Round (N_det)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">pcs / round</span>
              </div>
              <input
                type="number"
                step="1"
                min="1"
                value={a.detonatorsPerRound}
                onChange={(e) => onChange({ detonatorsPerRound: Math.max(1, parseInt(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Delay caps loaded per heading face blast</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Drill Rod Wear Rate (k_rod)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">m rod / m drilled</span>
              </div>
              <input
                type="number"
                step="0.001"
                min="0"
                value={a.drillRodLossRate}
                onChange={(e) => onChange({ drillRodLossRate: Math.max(0, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Steel loss factor per meter drilled</span>
            </div>
          </div>
        </div>

        {/* Rock Support Class Design */}
        <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
          <div className="flex items-center space-x-2 text-[#051C2C] pb-2 border-b border-[#E8E8E6]">
            <ShieldCheck className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold">Primary Rock Support (C10 : C14)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Shotcrete Thickness (t_shot)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0.02"
                max="0.5"
                value={a.shotcreteThickness}
                onChange={(e) => onChange({ shotcreteThickness: Math.max(0.01, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Design lining shell thickness (e.g. 0.15m)</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rock Bolt Grid Spacing (S_bolt)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.4"
                value={a.rockBoltSpacing}
                onChange={(e) => onChange({ rockBoltSpacing: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Longitudinal and circumferential spacing</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Single Rock Bolt Length (L_bolt)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.5"
                min="1.0"
                value={a.rockBoltLength}
                onChange={(e) => onChange({ rockBoltLength: Math.max(0.5, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Standard system anchor length</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Steel Arch Spacing (S_arch)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">meters</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.5"
                value={a.steelArchSpacing}
                onChange={(e) => onChange({ steelArchSpacing: Math.max(0.1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Center-to-center spacing of rib sets</span>
            </div>

            <div className="sm:col-span-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Steel Arch Unit Weight (w_arch)
                </label>
                <span className="text-[11px] text-[#888888] font-mono">kg / linear meter</span>
              </div>
              <input
                type="number"
                step="0.5"
                min="5"
                value={a.steelArchWeightPerM}
                onChange={(e) => onChange({ steelArchWeightPerM: Math.max(1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-semibold font-mono"
              />
              <span className="text-[11px] text-[#888888]">Profile weight (e.g. 38.5 kg/m for I18, 44.0 kg/m for HEB140)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Efficiency Benchmarks */}
      <div className="card p-6 space-y-4 bg-white border border-[#E8E8E6]">
        <div className="flex items-center space-x-2 text-[#051C2C] pb-2 border-b border-[#E8E8E6]">
          <Activity className="w-4 h-4 text-[#2251FF]" />
          <h2 className="font-display text-base font-semibold">Equipment Productive Cycle Speed Benchmarks</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Jumbo Drilling Speed (v_drill)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="5"
                min="10"
                value={a.jumboDrillingSpeedMPerHour}
                onChange={(e) => onChange({ jumboDrillingSpeedMPerHour: Math.max(1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-mono font-semibold"
              />
              <span className="text-xs text-gray-500 whitespace-nowrap">m / hr</span>
            </div>
            <span className="text-[11px] text-[#888888]">Combined penetration rate of all booms</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Mucking / Haulage Capacity (q_muck)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="5"
                min="10"
                value={a.muckingCapacityM3PerHour}
                onChange={(e) => onChange({ muckingCapacityM3PerHour: Math.max(1, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-mono font-semibold"
              />
              <span className="text-xs text-gray-500 whitespace-nowrap">m³ / hr</span>
            </div>
            <span className="text-[11px] text-[#888888]">Muck-pile loader loading & transport rate</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Shotcrete Robot Output (q_shot)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="1"
                min="1"
                value={a.shotcreteRobotSpeedM3PerHour}
                onChange={(e) => onChange({ shotcreteRobotSpeedM3PerHour: Math.max(0.5, parseFloat(e.target.value) || 0) })}
                className="w-full editable-input text-sm font-mono font-semibold"
              />
              <span className="text-xs text-gray-500 whitespace-nowrap">m³ / hr</span>
            </div>
            <span className="text-[11px] text-[#888888]">Spraying rate including repositioning & wash</span>
          </div>
        </div>
      </div>
    </div>
  );
};
