import React from 'react';
import { ShieldCheck, Cpu, Database, HardDrive } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#E8E8E6] bg-white py-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Mandatory Local Storage Privacy Statement */}
        <p className="text-[11px] text-[#888888] max-w-xl leading-relaxed text-center md:text-left">
          <strong className="text-[#051C2C] font-semibold">Privacy Notice:</strong> Storage is handled exclusively via browser <code className="font-mono text-[10px] bg-[#F5F5F2] text-[#051C2C] px-1 py-0.5 rounded border border-[#E8E8E6]">localStorage</code>. This application does not store or transmit any project data to external servers.
        </p>

        {/* Right: Version and system tags */}
        <div className="flex items-center space-x-4 text-[10px] font-bold text-[#051C2C] uppercase tracking-widest shrink-0 font-mono">
          <span className="text-[#888888]">Tunnel Drill-and-Blast Engine</span>
          <span className="text-[#888888]">•</span>
          <span className="text-[#051C2C]">v2.1.0-LIGHT</span>
        </div>
      </div>
    </footer>
  );
};
