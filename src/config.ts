/**
 * Konfigurasi data bisnis LaundryCalc sesuai Bagian 11 PRD serta batas validasi yang disepakati.
 */

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddOnCode = 'T01' | 'T02';
export type AddOnCalculationType = 'flat' | 'per_billed_kg';

export interface MainService {
  code: ServiceCode;
  name: string;
  pricePerKg: number;
  durationDays: number;
  description: string;
}

export interface AddOnService {
  code: AddOnCode;
  name: string;
  price: number;
  calculationType: AddOnCalculationType;
  notes: string;
}

export const STORE_INFO = {
  name: 'Laundry Kilau Max',
  /** Nomor WhatsApp contoh untuk prototipe (format 62xxx tanpa tanda plus atau spasi). */
  whatsappNumber: '6281234567890',
  openingHours: '08.00–20.00 WIB',
  pickupHours: '09.00–17.00 WIB',
  pickupRadiusMaxKm: 5,
  minimumChargeKg: 3.0,
} as const;

export const WEIGHT_LIMITS = {
  minKg: 0.1,
  maxKg: 100,
  stepKg: 0.1,
} as const;

export const DEFAULT_SERVICE_CODE: ServiceCode = 'L02';

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    pricePerKg: 6000,
    durationDays: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    pricePerKg: 8000,
    durationDays: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    pricePerKg: 15000,
    durationDays: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
] as const;

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculationType: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculationType: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
] as const;

export const ESTIMATION_CLAUSE =
  'Nominal di atas adalah estimasi awal sebelum penimbangan ulang oleh kasir atau kurir toko.';
