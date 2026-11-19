/**
 * Generator teks pesan WhatsApp terstruktur sesuai template PRD Bagian 7 dan tautan deep-link wa.me (BL-03).
 */

import { STORE_INFO } from '../config';
import type { OrderEstimateResult } from './calculator';
import { formatRupiah, formatThousands, formatWeight } from './format';

export interface WhatsAppMessagePayload {
  customerName: string;
  pickupAddress: string;
  orderNotes: string;
  deliveryActive: boolean;
  perfumeActive: boolean;
  estimate: OrderEstimateResult;
}

/**
 * Menormalkan nomor WhatsApp Indonesia ke format angka saja berawalan 62 (contoh: 6281234567890).
 */
export function normalizeIndonesianPhoneTo62(rawPhone: string): string {
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (digitsOnly.startsWith('0')) {
    return `62${digitsOnly.slice(1)}`;
  }
  if (digitsOnly.startsWith('62')) {
    return digitsOnly;
  }
  return `62${digitsOnly}`;
}

/**
 * Menyusun pesan pesanan WhatsApp persis mengikuti format baku PRD Bagian 7.
 */
export function buildWhatsAppMessage(payload: WhatsAppMessagePayload): string {
  const cleanName = payload.customerName.trim();
  const cleanAddress = payload.deliveryActive
    ? payload.pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const cleanNotes = payload.orderNotes.trim() || '-';

  const actualWeightText = formatWeight(payload.estimate.actualWeightKg ?? 0);
  const billedWeightText = formatWeight(payload.estimate.billedWeightKg ?? 0);

  const deliveryLine = payload.deliveryActive
    ? `Ya (+${formatRupiah(payload.estimate.deliveryCost)})`
    : 'Tidak';
  const perfumeLine = payload.perfumeActive
    ? `Ya (+${formatRupiah(payload.estimate.perfumeCost)})`
    : 'Tidak';

  const totalText = formatThousands(payload.estimate.totalEstimate);

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${cleanName}`,
    `*Layanan Utama:* ${payload.estimate.service.name}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryLine}`,
    `- Pewangi Premium: ${perfumeLine}`,
    '',
    `*Alamat Penjemputan:* ${cleanAddress}`,
    `*Catatan Khusus:* ${cleanNotes}`,
    '',
    `*Estimasi Total Biaya:* *Rp${totalText}*`,
    '',
    '_(Catatan: Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry)._',
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/**
 * Membuat tautan resmi https://wa.me/<nomor>?text=<encoded> dengan encodeURIComponent.
 */
export function buildWhatsAppDeepLink(
  payload: WhatsAppMessagePayload,
  storePhone: string = STORE_INFO.whatsappNumber,
): string {
  const normalizedPhone = normalizeIndonesianPhoneTo62(storePhone);
  const message = buildWhatsAppMessage(payload);
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}
