import React, { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

export const EngineeringDisclaimerBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 rounded-xl border border-[#E8E8E6] bg-white shadow-xs overflow-hidden transition-all duration-200 border-l-4 border-l-[#2251FF]">
      {/* Top Banner Header Strip - Light-First Surface */}
      <div className="bg-[#F5F5F2] px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E8E8E6]">
        <div className="flex items-center space-x-2.5">
          <div className="p-1 rounded bg-[#2251FF]/10 text-[#2251FF] shrink-0">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold tracking-wide uppercase font-mono text-[#051C2C]">
              Professional Engineering Scope & Advisory Notice
            </span>
            <span className="text-[10px] bg-blue-50 text-[#2251FF] font-mono px-2 py-0.5 rounded font-semibold border border-blue-100">
              Guidance
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[11px] text-gray-600 hover:text-[#051C2C] flex items-center space-x-1 self-end sm:self-auto cursor-pointer font-medium"
        >
          <span>{isExpanded ? 'Collapse Scope Details' : 'Read Scope Details'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Notice Content */}
      <div className="p-4 sm:p-5 text-xs text-[#1A1A2E] space-y-3 bg-white">
        <div className="flex items-start space-x-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2251FF] mt-1.5 shrink-0" />
          <p className="text-xs text-[#1A1A2E] leading-relaxed font-normal">
            <strong className="text-[#051C2C] font-semibold">Engine Purpose & Computational Boundary: </strong>
            This tool is designed as a rigorous cost estimation and Bill of Quantities (BOQ) computational engine; however, it does <u>not</u> replace the professional engineering judgment, site-specific geotechnical investigations, and certified design authorizations of <strong>Tunnel Engineers</strong>, <strong>Blasting Engineers</strong>, or <strong>Geotechnical Specialists</strong> in establishing blast patterns, explosive loading regimes, perimeter presplit spacing, rock mass classifications (e.g., Q-system, RMR, GSI), or structural ground support classes.
          </p>
        </div>

        {isExpanded && (
          <div className="pt-3 border-t border-[#E8E8E6] grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-gray-600 animate-fadeUp">
            <div className="p-3 bg-[#F5F5F2] rounded-lg border border-[#E8E8E6] space-y-1">
              <span className="font-semibold text-[#051C2C] block">1. Blast Pattern & Explosives</span>
              <p>Specific charge (q), hole burden/spacing, cut geometry, and charge distribution must be verified against actual rock strength and PPV vibration limits.</p>
            </div>
            <div className="p-3 bg-[#F5F5F2] rounded-lg border border-[#E8E8E6] space-y-1">
              <span className="font-semibold text-[#051C2C] block">2. Rock Mass & Ground Support</span>
              <p>Shotcrete thickness, rock bolt spacing/embedment, and steel arch profiles must be sanctioned by ground support design standards under structural tunnel codes.</p>
            </div>
            <div className="p-3 bg-[#F5F5F2] rounded-lg border border-[#E8E8E6] space-y-1">
              <span className="font-semibold text-[#051C2C] block">3. Commercial Procurement & Risk</span>
              <p>Quantities and unit rates calculated herein reflect parametric modeling for tender analysis. Final procurement purchase orders require field survey verification.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
