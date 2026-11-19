/**
 * Komponen katalog dan pemilih paket layanan utama laundry (FT-01).
 */

import { Check } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface ServiceCatalogProps {
  selectedServiceCode: ServiceCode;
  onSelectService: (code: ServiceCode) => void;
}

export function ServiceCatalog({
  selectedServiceCode,
  onSelectService,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="heading-layanan" className="space-y-3">
      <h2 id="heading-layanan" className="text-lg font-semibold text-neutral-900">
        Pilih Layanan Utama
      </h2>

      <div role="radiogroup" aria-labelledby="heading-layanan" className="space-y-3">
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedServiceCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectService(service.code)}
              className={`w-full rounded-2xl p-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isSelected
                  ? 'bg-blue-50 ring-2 ring-blue-700'
                  : 'bg-white hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-base font-semibold text-neutral-900">
                      {service.name}
                    </span>
                    <span className="text-sm font-medium text-neutral-600">
                      Selesai {service.durationDays} hari
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">{service.description}</p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-base font-semibold tabular-nums text-blue-700">
                    {formatRupiah(service.pricePerKg)}/kg
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      isSelected
                        ? 'border-blue-700 bg-blue-700 text-white'
                        : 'border-neutral-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
