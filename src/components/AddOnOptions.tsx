/**
 * Komponen pilihan layanan tambahan Antar-Jemput dan Pewangi Premium (FT-03).
 */

import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatRupiah } from '../lib/format';

interface AddOnOptionsProps {
  deliveryActive: boolean;
  perfumeActive: boolean;
  onToggleDelivery: () => void;
  onTogglePerfume: () => void;
  perfumeCost: number;
  hasValidWeight: boolean;
}

export function AddOnOptions({
  deliveryActive,
  perfumeActive,
  onToggleDelivery,
  onTogglePerfume,
  perfumeCost,
  hasValidWeight,
}: AddOnOptionsProps) {
  return (
    <section aria-labelledby="heading-addon" className="space-y-3">
      <h2 id="heading-addon" className="text-lg font-semibold text-neutral-900">
        Layanan Tambahan
      </h2>

      <div className="space-y-3">
        {ADD_ONS.map((addOn) => {
          const isDelivery = addOn.code === 'T01';
          const isChecked = isDelivery ? deliveryActive : perfumeActive;
          const handleToggle = isDelivery ? onToggleDelivery : onTogglePerfume;

          const priceLabel =
            addOn.calculationType === 'flat'
              ? `+${formatRupiah(addOn.price)}`
              : `+${formatRupiah(addOn.price)}/kg ditagih`;

          return (
            <button
              key={addOn.code}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={handleToggle}
              className={`w-full rounded-2xl p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isChecked
                  ? 'bg-blue-50 ring-2 ring-blue-700'
                  : 'bg-white hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-semibold text-neutral-900">
                      {addOn.name}
                    </span>
                    <span className="text-sm font-medium tabular-nums text-blue-700">
                      {priceLabel}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">{addOn.notes}</p>
                  {!isDelivery && isChecked && hasValidWeight && (
                    <p className="text-sm font-medium tabular-nums text-blue-700">
                      Tambahan pewangi: +{formatRupiah(perfumeCost)}
                    </p>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                    isChecked
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white text-transparent'
                  }`}
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
