/**
 * Komponen input estimasi berat cucian beserta notifikasi otomatis aturan minimum charge 3 kg (FT-02).
 */

import { forwardRef } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { STORE_INFO } from '../config';
import { formatWeight } from '../lib/format';

interface WeightInputProps {
  weightInput: string;
  onWeightChange: (value: string) => void;
  actualWeightKg: number | null;
  billedWeightKg: number | null;
  isMinimumChargeApplied: boolean;
  errorMessage?: string;
}

export const WeightInput = forwardRef<HTMLInputElement, WeightInputProps>(
  function WeightInput(
    {
      weightInput,
      onWeightChange,
      actualWeightKg,
      billedWeightKg,
      isMinimumChargeApplied,
      errorMessage,
    },
    ref,
  ) {
    const inputId = 'estimated-weight';
    const helpId = 'estimated-weight-help';
    const errorId = 'estimated-weight-error';
    const hasError = Boolean(errorMessage);

    return (
      <section aria-labelledby="heading-berat" className="rounded-2xl bg-white p-4 sm:p-6">
        <div className="space-y-3">
          <div className="space-y-1">
            <label
              htmlFor={inputId}
              className="block text-lg font-semibold text-neutral-900"
            >
              Estimasi Berat Cucian
            </label>
            <p id={helpId} className="text-sm text-neutral-600">
              Minimal tagihan {formatWeight(STORE_INFO.minimumChargeKg)} kg per pesanan.
            </p>
          </div>

          <div className="relative flex items-center">
            <input
              ref={ref}
              id={inputId}
              name="estimatedWeight"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="mis. 3,5"
              value={weightInput}
              onChange={(event) => onWeightChange(event.target.value)}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${helpId} ${errorId}` : helpId}
              className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 text-base tabular-nums text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                hasError ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <span className="pointer-events-none absolute right-4 text-sm font-medium text-neutral-600">
              kg
            </span>
          </div>

          {hasError && (
            <div
              id={errorId}
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!hasError && isMinimumChargeApplied && actualWeightKg !== null && billedWeightKg !== null && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Berat {formatWeight(actualWeightKg)} kg dihitung sebagai{' '}
                <strong className="font-semibold tabular-nums">
                  {formatWeight(billedWeightKg)} kg
                </strong>{' '}
                karena berlaku minimum charge {formatWeight(STORE_INFO.minimumChargeKg)} kg.
              </span>
            </div>
          )}
        </div>
      </section>
    );
  },
);
