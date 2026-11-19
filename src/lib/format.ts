/**
 * Fungsi pemformatan dan pembacaan angka baku (Rupiah dan berat kg) yang dipakai di seluruh aplikasi.
 */

const rupiahNumberFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

const weightNumberFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * Memformat angka uang bulat ke format Rupiah Indonesia tanpa spasi dan tanpa desimal (contoh: Rp50.000).
 */
export function formatRupiah(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `Rp${rupiahNumberFormatter.format(safeAmount)}`;
}

/**
 * Memformat angka berat ke format desimal koma tanpa nol berlebih di belakang (contoh: 4,5 dan 3).
 */
export function formatWeight(weightKg: number): string {
  if (!Number.isFinite(weightKg)) {
    return '0';
  }
  return weightNumberFormatter.format(weightKg);
}

/**
 * Memformat angka nominal tanpa awalan "Rp" dengan titik pemisah ribuan (untuk placeholder template *Rp[Total]*).
 */
export function formatThousands(amount: number): string {
  const safeAmount = Number.isFinite(amount) ? Math.round(amount) : 0;
  return rupiahNumberFormatter.format(safeAmount);
}

export type WeightParseResult =
  | { status: 'empty'; value: null }
  | { status: 'invalid'; value: null }
  | { status: 'valid'; value: number };

/**
 * Mengurai teks input berat (menerima koma maupun titik sebagai pemisah desimal).
 */
export function parseWeightInput(rawInput: string): WeightParseResult {
  const trimmed = rawInput.trim();
  if (trimmed === '') {
    return { status: 'empty', value: null };
  }

  const normalized = trimmed.replace(',', '.');
  if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
    return { status: 'invalid', value: null };
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return { status: 'invalid', value: null };
  }

  return { status: 'valid', value: parsed };
}
