/**
 * Fungsi perhitungan berat ditagih (BL-01) dan estimasi total biaya cucian beserta add-on (BL-02).
 */

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  WEIGHT_LIMITS,
  type MainService,
  type ServiceCode,
} from '../config';

export interface OrderEstimateInput {
  serviceCode: ServiceCode;
  actualWeightKg: number | null;
  deliveryActive: boolean;
  perfumeActive: boolean;
}

export interface OrderEstimateResult {
  service: MainService;
  hasValidWeight: boolean;
  actualWeightKg: number | null;
  billedWeightKg: number | null;
  isMinimumChargeApplied: boolean;
  mainCost: number;
  deliveryCost: number;
  perfumeCost: number;
  addOnCost: number;
  totalEstimate: number;
}

/**
 * Menghitung berat ditagih berdasarkan aturan minimum charge 3 kg (BL-01).
 */
export function calculateBilledWeight(
  actualWeightKg: number,
  minimumChargeKg: number = STORE_INFO.minimumChargeKg,
): number {
  return Math.max(minimumChargeKg, actualWeightKg);
}

/**
 * Menghitung rincian estimasi biaya layanan utama, layanan tambahan, dan total tagihan (BL-02).
 */
export function calculateOrderEstimate(input: OrderEstimateInput): OrderEstimateResult {
  const service =
    MAIN_SERVICES.find((item) => item.code === input.serviceCode) ?? MAIN_SERVICES[0];

  const deliveryAddOn = ADD_ONS.find((item) => item.code === 'T01');
  const perfumeAddOn = ADD_ONS.find((item) => item.code === 'T02');

  const deliveryPrice = deliveryAddOn ? deliveryAddOn.price : 10000;
  const perfumePricePerKg = perfumeAddOn ? perfumeAddOn.price : 2000;

  const deliveryCost = input.deliveryActive ? deliveryPrice : 0;

  const isWeightInRange =
    input.actualWeightKg !== null &&
    Number.isFinite(input.actualWeightKg) &&
    input.actualWeightKg >= WEIGHT_LIMITS.minKg &&
    input.actualWeightKg <= WEIGHT_LIMITS.maxKg;

  if (!isWeightInRange || input.actualWeightKg === null) {
    return {
      service,
      hasValidWeight: false,
      actualWeightKg: null,
      billedWeightKg: null,
      isMinimumChargeApplied: false,
      mainCost: 0,
      deliveryCost,
      perfumeCost: 0,
      addOnCost: deliveryCost,
      totalEstimate: deliveryCost,
    };
  }

  const billedWeightKg = calculateBilledWeight(
    input.actualWeightKg,
    STORE_INFO.minimumChargeKg,
  );
  const isMinimumChargeApplied = input.actualWeightKg < STORE_INFO.minimumChargeKg;

  const mainCost = Math.round(billedWeightKg * service.pricePerKg);
  const perfumeCost = input.perfumeActive
    ? Math.round(billedWeightKg * perfumePricePerKg)
    : 0;
  const addOnCost = deliveryCost + perfumeCost;
  const totalEstimate = mainCost + addOnCost;

  return {
    service,
    hasValidWeight: true,
    actualWeightKg: input.actualWeightKg,
    billedWeightKg,
    isMinimumChargeApplied,
    mainCost,
    deliveryCost,
    perfumeCost,
    addOnCost,
    totalEstimate,
  };
}
