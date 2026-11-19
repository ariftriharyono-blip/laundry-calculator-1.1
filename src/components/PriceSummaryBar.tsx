/**
 * Komponen ringkasan biaya langsung (FT-04) dan tombol kirim pesanan ke WhatsApp (FT-06).
 */

import { CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import { ESTIMATION_CLAUSE } from '../config';
import type { OrderEstimateResult } from '../lib/calculator';
import { formatRupiah, formatWeight } from '../lib/format';

interface PriceSummaryBarProps {
  estimate: OrderEstimateResult;
  deliveryActive: boolean;
  perfumeActive: boolean;
  onSubmitOrder: () => void;
  lastGeneratedLink: string | null;
  copiedSuccess: boolean;
  onCopyMessage: () => void;
}

export function PriceSummaryBar({
  estimate,
  deliveryActive,
  perfumeActive,
  onSubmitOrder,
  lastGeneratedLink,
  copiedSuccess,
  onCopyMessage,
}: PriceSummaryBarProps) {
  const billedWeightLabel =
    estimate.hasValidWeight && estimate.billedWeightKg !== null
      ? `${formatWeight(estimate.billedWeightKg)} kg × ${formatRupiah(estimate.service.pricePerKg)}`
      : 'Menunggu berat';

  return (
    <>
      {/* Panel ringkasan di sisi kanan untuk layar desktop */}
      <aside
        aria-label="Rincian Estimasi Biaya"
        className="hidden rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:sticky lg:top-8 lg:block"
      >
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            Rincian Estimasi Biaya
          </h2>

          <dl className="divide-y divide-neutral-200 border-t border-b border-neutral-200 text-sm">
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-neutral-600">
                <div>{estimate.service.name}</div>
                <div className="tabular-nums text-neutral-600">{billedWeightLabel}</div>
              </dt>
              <dd className="font-semibold tabular-nums text-neutral-900">
                {formatRupiah(estimate.mainCost)}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="space-y-1 text-neutral-600">
                <div>Biaya Tambahan</div>
                {deliveryActive && (
                  <div className="tabular-nums">
                    Antar-Jemput ({formatRupiah(estimate.deliveryCost)})
                  </div>
                )}
                {perfumeActive && (
                  <div className="tabular-nums">
                    Pewangi Premium (
                    {estimate.hasValidWeight
                      ? formatRupiah(estimate.perfumeCost)
                      : 'Menunggu berat'}
                    )
                  </div>
                )}
                {!deliveryActive && !perfumeActive && <div>Tidak ada</div>}
              </dt>
              <dd className="font-semibold tabular-nums text-neutral-900">
                {formatRupiah(estimate.addOnCost)}
              </dd>
            </div>
          </dl>

          <div className="flex items-baseline justify-between gap-4">
            <span className="text-base font-semibold text-neutral-900">
              Total Estimasi
            </span>
            <span className="text-3xl font-semibold tabular-nums text-neutral-900">
              {formatRupiah(estimate.totalEstimate)}
            </span>
          </div>

          <p className="text-sm text-neutral-600">{ESTIMATION_CLAUSE}</p>

          <button
            type="button"
            onClick={onSubmitOrder}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-base font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span>Kirim ke WhatsApp</span>
          </button>

          {lastGeneratedLink && (
            <div
              role="status"
              className="space-y-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Pesanan siap dikirim lewat WhatsApp.</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={lastGeneratedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Buka WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onCopyMessage}
                  className="inline-flex items-center gap-1 font-medium underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>{copiedSuccess ? 'Tersalin' : 'Salin Pesan'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Bar bawah menempel untuk layar ponsel dan tablet */}
      <div
        role="region"
        aria-label="Ringkasan Biaya dan Kirim Pesanan"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:hidden"
      >
        <div className="mx-auto max-w-2xl space-y-2">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0 space-y-1 text-sm text-neutral-600">
              <div className="truncate tabular-nums">
                Layanan: <strong className="font-semibold text-neutral-900">{formatRupiah(estimate.mainCost)}</strong>
                {estimate.hasValidWeight && estimate.billedWeightKg !== null
                  ? ` (${formatWeight(estimate.billedWeightKg)} kg)`
                  : ''}
              </div>
              <div className="tabular-nums">
                Tambahan: <strong className="font-semibold text-neutral-900">{formatRupiah(estimate.addOnCost)}</strong>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="text-sm text-neutral-600">Total Estimasi</div>
              <div className="text-2xl font-semibold tabular-nums text-neutral-900">
                {formatRupiah(estimate.totalEstimate)}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onSubmitOrder}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-base font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span>Kirim ke WhatsApp</span>
          </button>

          <p className="text-sm text-neutral-600">
            {lastGeneratedLink ? (
              <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-emerald-800">
                <span>Pesanan siap dikirim.</span>
                <a
                  href={lastGeneratedLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Buka WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onCopyMessage}
                  className="font-medium underline"
                >
                  {copiedSuccess ? 'Tersalin' : 'Salin Pesan'}
                </button>
              </span>
            ) : (
              'Estimasi awal sebelum penimbangan ulang di toko.'
            )}
          </p>
        </div>
      </div>
    </>
  );
}
