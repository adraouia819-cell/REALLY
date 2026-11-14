import React from 'react';
import { X } from 'lucide-react';

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const SIZE_CHART = [
  { size: 'XS', chest: '84 - 88 cm', waist: '66 - 70 cm', hip: '90 - 94 cm' },
  { size: 'S', chest: '89 - 93 cm', waist: '71 - 75 cm', hip: '95 - 99 cm' },
  { size: 'M', chest: '94 - 98 cm', waist: '76 - 81 cm', hip: '100 - 104 cm' },
  { size: 'L', chest: '99 - 104 cm', waist: '82 - 87 cm', hip: '105 - 110 cm' },
  { size: 'XL', chest: '105 - 111 cm', waist: '88 - 94 cm', hip: '111 - 116 cm' },
  { size: 'XXL', chest: '112 - 118 cm', waist: '95 - 102 cm', hip: '117 - 122 cm' },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg bg-white p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border">
          <h3 className="font-serif text-2xl">Guide des tailles</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="p-2 text-brand-muted hover:text-brand-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-brand-muted mt-4 leading-relaxed">
          Nos coupes sont ajustées selon les standards européens. Si vous hésitez
          entre deux tailles, choisissez la taille supérieure pour un tombé plus
          fluide.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse tabular-nums">
            <thead>
              <tr className="border-b border-brand-border text-brand-muted uppercase tracking-[0.14em]">
                <th className="py-2.5 pr-4">Taille</th>
                <th className="py-2.5 pr-4">Poitrine</th>
                <th className="py-2.5 pr-4">Taille</th>
                <th className="py-2.5">Hanches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {SIZE_CHART.map((row) => (
                <tr key={row.size}>
                  <td className="py-2.5 pr-4 font-semibold">{row.size}</td>
                  <td className="py-2.5 pr-4">{row.chest}</td>
                  <td className="py-2.5 pr-4">{row.waist}</td>
                  <td className="py-2.5">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
