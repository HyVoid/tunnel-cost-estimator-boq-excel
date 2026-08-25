import React, { useState, useRef } from 'react';
import { PriceDatabaseItem } from '../types';
import { parsePriceDatabaseCsv, exportPriceDatabaseCsv } from '../utils/storage';
import { X, Upload, Download, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';

interface BulkCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: PriceDatabaseItem[];
  onImportItems: (newItems: PriceDatabaseItem[]) => void;
}

export const BulkCsvModal: React.FC<BulkCsvModalProps> = ({
  isOpen,
  onClose,
  items,
  onImportItems,
}) => {
  const [csvText, setCsvText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<PriceDatabaseItem[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleParseText = (text: string) => {
    setErrorMsg(null);
    setCsvText(text);
    if (!text.trim()) {
      setParsedPreview(null);
      return;
    }
    try {
      const parsed = parsePriceDatabaseCsv(text);
      setParsedPreview(parsed);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse CSV text.');
      setParsedPreview(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      handleParseText(content);
    };
    reader.readAsText(file);
  };

  const handleCommit = () => {
    if (parsedPreview && parsedPreview.length > 0) {
      onImportItems(parsedPreview);
      onClose();
    }
  };

  const sampleCsv = `Material_ID,Category,Material_Name,Specification,Unit,Base_Unit_Rate,Waste_Allowance_Rate_Percent
MAT-001,Explosives & Blasting,Bulk Emulsion Explosive,High VOD Matrix,kg,4.80,3.0
MAT-002,Explosives & Blasting,Digital Electronic Detonators,Programmable Delay,pcs,16.50,2.0
MAT-003,Drilling Consumables,R32 Premium Drill Rods,Tungsten Carbide 45mm,m,42.00,5.0
MAT-004,Ground Support,Fiber-Reinforced Wet Shotcrete,C30/37 with Steel Fibers,m³,185.00,15.0
MAT-005,Ground Support,Resin Rock Bolts,HRB500 Ø25mm L=3.0m,pcs,36.00,4.0
MAT-006,Ground Support,Structural Steel Arch,Heavy I18 S355,ton,1680.00,5.0`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#051C2C]/40 backdrop-blur-xs p-4 animate-fadeUp">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-[#E8E8E6] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 px-6 border-b border-[#E8E8E6] flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-[#2251FF]" />
            <h3 className="font-display font-semibold text-lg text-[#051C2C]">
              Bulk CSV Price Database Importer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-gray-600">
              Upload a comma-separated <code className="font-mono text-[11px] bg-[#F5F5F2] px-1 py-0.5 rounded border border-[#E8E8E6]">.csv</code> file or paste spreadsheet text below.
            </p>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => exportPriceDatabaseCsv(items)}
                className="h-7 px-2.5 rounded text-[11px] font-medium text-gray-700 bg-[#F5F5F2] hover:bg-[#E8E8E6] border border-[#E8E8E6] transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <Download className="w-3 h-3 text-[#2251FF]" />
                <span>Export Current CSV</span>
              </button>
              <button
                onClick={() => handleParseText(sampleCsv)}
                className="h-7 px-2.5 rounded text-[11px] font-medium text-[#2251FF] bg-[#2251FF]/10 hover:bg-[#2251FF]/20 transition-colors flex items-center space-x-1 cursor-pointer"
              >
                <span>Load Sample CSV</span>
              </button>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv,text/csv"
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#E8E8E6] hover:border-[#2251FF] bg-[#FAFAFA] rounded-xl p-4 text-center cursor-pointer transition-colors"
          >
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
            <span className="text-xs font-semibold text-[#051C2C] block">Click to select a .csv file from your computer</span>
            <span className="text-[11px] text-gray-400">or paste plain text in the box below</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              CSV Content Text Box
            </label>
            <textarea
              rows={5}
              value={csvText}
              onChange={(e) => handleParseText(e.target.value)}
              placeholder="Paste comma-separated spreadsheet data here..."
              className="w-full editable-input font-mono text-xs p-3 leading-relaxed"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-[#D32F2F] rounded-lg text-xs flex items-center space-x-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {parsedPreview && (
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully parsed {parsedPreview.length} material records:</span>
              </div>
              <div className="max-h-40 overflow-y-auto border border-[#E8E8E6] rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#F5F5F2] border-b border-[#E8E8E6] sticky top-0">
                    <tr>
                      <th className="py-2 px-3">ID</th>
                      <th className="py-2 px-3">Category</th>
                      <th className="py-2 px-3">Material Name</th>
                      <th className="py-2 px-2 text-center">Unit</th>
                      <th className="py-2 px-3 text-right">Base Rate</th>
                      <th className="py-2 px-3 text-right">Waste</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {parsedPreview.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 font-mono text-[11px]">
                        <td className="py-1.5 px-3 font-semibold">{item.id}</td>
                        <td className="py-1.5 px-3 font-sans text-xs">{item.category}</td>
                        <td className="py-1.5 px-3 font-sans text-xs font-medium">{item.name}</td>
                        <td className="py-1.5 px-2 text-center">{item.unit}</td>
                        <td className="py-1.5 px-3 text-right">${item.baseUnitRate.toFixed(2)}</td>
                        <td className="py-1.5 px-3 text-right">{(item.wasteAllowanceRate * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-[#E8E8E6] bg-[#FAFAFA] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleCommit}
            disabled={!parsedPreview || parsedPreview.length === 0}
            className={`px-5 py-2 rounded-lg text-xs font-medium text-white transition-colors cursor-pointer shadow-xs ${
              parsedPreview && parsedPreview.length > 0
                ? 'bg-[#2251FF] hover:bg-[#2251FF]/90'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Apply & Replace Price Database
          </button>
        </div>
      </div>
    </div>
  );
};
