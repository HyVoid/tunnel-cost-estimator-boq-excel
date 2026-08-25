import React, { useState } from 'react';
import { ComputedEngine, ProjectInputs, EngineeringAssumptions } from '../types';
import { formatNumber } from '../utils/calculations';
import { Cpu, Drill, Sparkles, Clock, Layers, ShieldCheck, Bomb, Wrench } from 'lucide-react';

interface DrillBlastEngineSheetProps {
  engine: ComputedEngine;
  projectInputs: ProjectInputs;
  engineeringAssumptions: EngineeringAssumptions;
}

export const DrillBlastEngineSheet: React.FC<DrillBlastEngineSheetProps> = ({
  engine,
  projectInputs: p,
  engineeringAssumptions: a,
}) => {
  const physicalMetrics = [
    {
      cell: 'C3',
      id: 'Engine_Total_Volume',
      title: 'Design Excavation Volume',
      value: engine.designExcavationVolume,
      unit: 'm³',
      formula: `='01_Project_Inputs'!C15 (L × A₀ × (1 + Overbreak))`,
      desc: 'Total solid rock volume to be blasted and transported',
      icon: Layers,
      highlight: true,
    },
    {
      cell: 'C4',
      id: 'Engine_Total_Cycles',
      title: 'Heading Blast Cycles',
      value: engine.totalCycles,
      unit: 'rounds',
      formula: `=ROUNDUP('01_Project_Inputs'!C5 / '02_Engineering_Assumptions'!C4, 0)`,
      desc: 'Total tunnel excavation heading rounds to completion',
      icon: Sparkles,
      highlight: false,
    },
    {
      cell: 'C5',
      id: 'Engine_Total_Drill_Meters',
      title: 'Total Drilling Length',
      value: engine.totalDrillMeters,
      unit: 'linear m',
      formula: `='02_Engineering_Assumptions'!C16 * '02_Engineering_Assumptions'!C18`,
      desc: 'Cumulative jumbo hole length (Rounds × Holes/Round × Depth)',
      icon: Drill,
      highlight: false,
    },
    {
      cell: 'C6',
      id: 'Total_Explosive_Qty',
      title: 'Total Explosives Demand',
      value: engine.totalExplosiveQty,
      unit: 'kg',
      formula: `='01_Project_Inputs'!C15 * '02_Engineering_Assumptions'!C7`,
      desc: 'Total bulk emulsion / packaged explosive procurement weight',
      icon: Bomb,
      highlight: true,
    },
    {
      cell: 'C7',
      id: 'Total_Detonators_Qty',
      title: 'Total Detonators Quantity',
      value: engine.totalDetonatorsQty,
      unit: 'pcs',
      formula: `='02_Engineering_Assumptions'!C16 * '02_Engineering_Assumptions'!C8`,
      desc: 'Total electronic/non-electric delay detonators needed for initiation',
      icon: Sparkles,
      highlight: false,
    },
    {
      cell: 'C8',
      id: 'Total_Drill_Rod_Loss',
      title: 'Drill Steel Consumption',
      value: engine.totalDrillRodLoss,
      unit: 'm',
      formula: `=C5 * '02_Engineering_Assumptions'!C9`,
      desc: 'Theoretical drill rod/shank/bit wear in equivalent steel meters',
      icon: Wrench,
      highlight: false,
    },
    {
      cell: 'C9',
      id: 'Total_Shotcrete_Volume',
      title: 'Primary Shotcrete Lining',
      value: engine.totalShotcreteVolume,
      unit: 'm³',
      formula: `='01_Project_Inputs'!C5 * '01_Project_Inputs'!C7 * '02_Engineering_Assumptions'!C10`,
      desc: 'Theoretical wet shotcrete volume (Length × Perimeter × Thickness)',
      icon: ShieldCheck,
      highlight: true,
    },
    {
      cell: 'C10',
      id: 'Total_Rock_Bolts_Qty',
      title: 'System Rock Bolts',
      value: engine.totalRockBoltsQty,
      unit: 'pieces',
      formula: `=ROUNDUP(P / S_bolt, 0) * ROUNDUP(L / S_bolt, 0)`,
      desc: 'Total resin-grouted radial rock bolts along perimeter & length grid',
      icon: ShieldCheck,
      highlight: false,
    },
    {
      cell: 'C11',
      id: 'Total_Steel_Arch_Weight',
      title: 'Structural Steel Arches',
      value: engine.totalSteelArchWeight,
      unit: 'tons',
      formula: `=ROUNDUP(L / S_arch, 0) * P * w_arch / 1000`,
      desc: 'Total heavy steel rib sets along length (Length / Spacing × Perimeter × kg/m)',
      icon: ShieldCheck,
      highlight: true,
    },
  ];

  const operationalHours = [
    {
      cell: 'C18',
      id: 'Jumbo_Operating_Hours',
      title: 'Jumbo Drill Rig Hours',
      value: engine.jumboHours,
      speedAssumption: `${a.jumboDrillingSpeedMPerHour || 60} m/hr`,
      formula: `=C5 / ${a.jumboDrillingSpeedMPerHour || 60}`,
      desc: 'Total machine drilling hours across all booms',
    },
    {
      cell: 'C19',
      id: 'Mucking_Operating_Hours',
      title: 'Mucking & Haulage Hours',
      value: engine.muckingHours,
      speedAssumption: `${a.muckingCapacityM3PerHour || 40} m³/hr`,
      formula: `=C3 / ${a.muckingCapacityM3PerHour || 40}`,
      desc: 'Total loader and truck active mucking & clearing hours',
    },
    {
      cell: 'C20',
      id: 'Shotcrete_Rig_Hours',
      title: 'Shotcrete Robot Hours',
      value: engine.shotcreteRigHours,
      speedAssumption: `${a.shotcreteRobotSpeedM3PerHour || 5} m³/hr`,
      formula: `=C9 / ${a.shotcreteRobotSpeedM3PerHour || 5}`,
      desc: 'Robotic spraying and boom manipulation hours',
    },
    {
      cell: 'C21',
      id: 'Total_Labour_Man_Hours',
      title: 'Underground Labor Man-Hours',
      value: engine.totalLabourHours,
      speedAssumption: `${engine.totalCrewSize} shift crew`,
      formula: `=SUM('04_Resource_Rates'!M4:M) * (C18 + C19 + (C9 / 5))`,
      desc: 'Total man-hours deployed inside tunnel heading across all trades',
    },
  ];

  return (
    <div className="animate-fadeUp space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-[#E8E8E6] gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2251FF] bg-[#2251FF]/10 px-2 py-0.5 rounded-sm">
              Sheet 05
            </span>
            <h1 className="text-2xl font-display font-medium text-[#051C2C]">
              Drill & Blast Quantity Takeoff & Resource Engine
            </h1>
          </div>
          <p className="text-xs text-[#888888] mt-1">
            Pure formula-driven core calculation engine. Automatically synthesizes geometry, blasting parameters, and support specifications into resource requirements.
          </p>
        </div>

        {/* Engine Status Badge - Light-First */}
        <div className="flex items-center space-x-2.5 bg-white border border-[#E8E8E6] text-[#051C2C] px-3.5 py-2 rounded-xl shadow-xs">
          <div className="p-1 rounded bg-[#2251FF]/10 text-[#2251FF]">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="text-[#888888] block text-[10px] uppercase font-mono">Engine Status</span>
            <span className="font-semibold text-[#051C2C]">Live Client Compute</span>
          </div>
        </div>
      </div>

      {/* Block 1: Physical Quantities & Material Demands */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold text-[#051C2C]">
              Block 1: Physical Quantities & Material Demands (A3 : F15)
            </h2>
          </div>
          <span className="text-xs text-[#888888] font-mono">9 Core Engineering Quantities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {physicalMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.cell}
                className="card p-5 space-y-3 relative border border-[#E8E8E6] bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#2251FF] bg-[#2251FF]/10 px-1.5 py-0.5 rounded-sm">
                      {item.cell}
                    </span>
                    <span className="text-xs font-semibold text-[#051C2C]">{item.title}</span>
                  </div>
                  <Icon className="w-4 h-4 text-[#888888]" />
                </div>

                <div className="pt-1">
                  <div className="text-2xl font-display font-bold text-[#051C2C] kpi-value">
                    {formatNumber(item.value, item.unit === 'rounds' || item.unit === 'pcs' || item.unit === 'pieces' ? 0 : 2)}{' '}
                    <span className="text-xs font-sans text-[#888888] font-normal">{item.unit}</span>
                  </div>
                  <p className="text-[11px] text-[#888888] mt-1 line-clamp-1">{item.desc}</p>
                </div>

                <div className="pt-2 border-t border-[#E8E8E6] flex items-center justify-between text-[11px] font-mono text-gray-600 bg-[#F5F5F2] p-2 rounded">
                  <code className="text-[#051C2C] truncate" title={item.formula}>
                    {item.formula}
                  </code>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Block 2: Operational Equipment & Labor Hours */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#2251FF]" />
            <h2 className="font-display text-base font-semibold text-[#051C2C]">
              Block 2: Machine Operating Hours & Crew Labor Man-Hours (A18 : F25)
            </h2>
          </div>
          <span className="text-xs text-[#888888] font-mono">Productivity & Shift Load</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {operationalHours.map((item) => (
            <div key={item.cell} className="card p-5 space-y-3 bg-white border border-[#E8E8E6]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#2251FF] bg-[#2251FF]/10 px-1.5 py-0.5 rounded-sm">
                  {item.cell}
                </span>
                <span className="text-[10px] font-medium text-gray-600 font-mono bg-[#F5F5F2] px-1.5 py-0.5 rounded border border-[#E8E8E6]">
                  {item.speedAssumption}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#051C2C] block">{item.title}</span>
                <div className="text-2xl font-display font-bold text-[#051C2C] mt-1 kpi-value">
                  {formatNumber(item.value, 1)}{' '}
                  <span className="text-xs font-sans text-[#888888] font-normal">hrs</span>
                </div>
                <p className="text-[11px] text-[#888888] mt-1">{item.desc}</p>
              </div>

              <div className="pt-2 border-t border-[#E8E8E6] text-[10px] font-mono text-gray-600 bg-[#F5F5F2] p-2 rounded truncate">
                <code>{item.formula}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
