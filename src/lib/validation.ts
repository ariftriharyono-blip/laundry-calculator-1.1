/**
 * Fungsi validasi formulir pesanan (FT-02, FT-05, dan BL-03) saat pengguna menekan tombol kirim.
 */

import { WEIGHT_LIMITS } from '../config';
import { parseWeightInput } from './format';

export type ErrorFieldKey = 'estimatedWeight' | 'customerName' | 'pickupAddress';

export interface OrderValidationInput {
  weightInput: string;
  customerName: string;
  deliveryActive: boolean;
  pickupAddress: string;
}

export interface OrderValidationResult {
  isValid: boolean;
  parsedWeightKg: number | null;
  trimmedName: string;
  trimmedAddress: string;
  errors: Partial<Record<ErrorFieldKey, string>>;
  firstErrorField: ErrorFieldKey | null;
}

/**
 * Memvalidasi seluruh kolom wajib pesanan secara berurutan dari atas ke bawah formulir.
 */
export function validateOrderForm(input: OrderValidationInput): OrderValidationResult {
  const errors: Partial<Record<ErrorFieldKey, string>> = {};
  const weightParsed = parseWeightInput(input.weightInput);
  let validWeight: number | null = null;

  if (weightParsed.status === 'empty') {
    errors.estimatedWeight = 'Masukkan estimasi berat minimal 0,1 kg, misalnya 2,5.';
  } else if (weightParsed.status === 'invalid') {
    errors.estimatedWeight = 'Gunakan angka untuk estimasi berat, misalnya 3 atau 4,5.';
  } else if (weightParsed.value < WEIGHT_LIMITS.minKg) {
    errors.estimatedWeight = 'Masukkan estimasi berat minimal 0,1 kg, misalnya 2,5.';
  } else if (weightParsed.value > WEIGHT_LIMITS.maxKg) {
    errors.estimatedWeight = 'Berat maksimal 100 kg per pesanan, misalnya 12,5.';
  } else {
    validWeight = weightParsed.value;
  }

  const trimmedName = input.customerName.trim();
  if (trimmedName.length === 0) {
    errors.customerName = 'Isi nama pemesan terlebih dahulu, misalnya Budi Santoso.';
  }

  const trimmedAddress = input.pickupAddress.trim();
  if (input.deliveryActive && trimmedAddress.length === 0) {
    errors.pickupAddress =
      'Isi alamat penjemputan karena Antar-Jemput dipilih, misalnya Jl. Melati No. 12.';
  }

  const orderedFields: ErrorFieldKey[] = [
    'estimatedWeight',
    'customerName',
    'pickupAddress',
  ];
  const firstErrorField = orderedFields.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    parsedWeightKg: validWeight,
    trimmedName,
    trimmedAddress,
    errors,
    firstErrorField,
  };
}
