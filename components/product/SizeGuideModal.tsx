'use client';

import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
}

export function SizeGuideModal({ isOpen, onClose, productType }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const sizeChartInches = [
    { size: 'XS', chest: '36"', length: '27"', shoulder: '18"', sleeve: '8.5"' },
    { size: 'S', chest: '38"', length: '28"', shoulder: '19"', sleeve: '9.0"' },
    { size: 'M', chest: '41"', length: '29"', shoulder: '20.5"', sleeve: '9.5"' },
    { size: 'L', chest: '44"', length: '30"', shoulder: '22"', sleeve: '10.0"' },
    { size: 'XL', chest: '47"', length: '31"', shoulder: '23.5"', sleeve: '10.5"' },
    { size: 'XXL', chest: '50"', length: '32"', shoulder: '25"', sleeve: '11.0"' }
  ];

  const sizeChartCm = [
    { size: 'XS', chest: '91 cm', length: '68 cm', shoulder: '45 cm', sleeve: '21 cm' },
    { size: 'S', chest: '96 cm', length: '71 cm', shoulder: '48 cm', sleeve: '23 cm' },
    { size: 'M', chest: '104 cm', length: '74 cm', shoulder: '52 cm', sleeve: '24 cm' },
    { size: 'L', chest: '112 cm', length: '76 cm', shoulder: '56 cm', sleeve: '25 cm' },
    { size: 'XL', chest: '119 cm', length: '79 cm', shoulder: '60 cm', sleeve: '26 cm' },
    { size: 'XXL', chest: '127 cm', length: '81 cm', shoulder: '63 cm', sleeve: '28 cm' }
  ];

  const currentChart = unit === 'inches' ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 border border-zinc-200 animate-scale">
          
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-amber-700" />
              <h3 className="text-lg font-bold text-zinc-950">Size & Measurement Guide</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-zinc-500">
              Silhouette profile for: <strong className="text-zinc-900">{productType}</strong>
            </p>
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  unit === 'inches' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  unit === 'cm' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-500'
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Size Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 text-zinc-500 font-semibold border-b border-zinc-200">
                <tr>
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest Width</th>
                  <th className="p-3">Body Length</th>
                  <th className="p-3">Shoulder</th>
                  <th className="p-3">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-medium text-zinc-800">
                {currentChart.map((row) => (
                  <tr key={row.size} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-3 font-bold text-zinc-950 bg-zinc-50/50">{row.size}</td>
                    <td className="p-3">{row.chest}</td>
                    <td className="p-3">{row.length}</td>
                    <td className="p-3">{row.shoulder}</td>
                    <td className="p-3">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-amber-950 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-amber-700" /> True to Size Fitting
            </p>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              If you prefer a relaxed slouchy aesthetic, we recommend ordering your true size. For a tailored, closer contour, take one size down.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
