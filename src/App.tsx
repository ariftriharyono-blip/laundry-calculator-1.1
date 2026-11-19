/**
 * Halaman utama LaundryCalc yang menyatukan katalog layanan, input berat, add-on, formulir pemesan, dan kirim WhatsApp.
 */

import { useMemo, useRef, useState } from 'react';
import { AddOnOptions } from './components/AddOnOptions';
import { OrderForm } from './components/OrderForm';
import { PriceSummaryBar } from './components/PriceSummaryBar';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WeightInput } from './components/WeightInput';
import { DEFAULT_SERVICE_CODE, STORE_INFO, type ServiceCode } from './config';
import { calculateOrderEstimate } from './lib/calculator';
import { parseWeightInput } from './lib/format';
import { validateOrderForm, type ErrorFieldKey } from './lib/validation';
import { buildWhatsAppDeepLink, buildWhatsAppMessage } from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] =
    useState<ServiceCode>(DEFAULT_SERVICE_CODE);
  const [weightInput, setWeightInput] = useState('');
  const [deliveryActive, setDeliveryActive] = useState(false);
  const [perfumeActive, setPerfumeActive] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [errors, setErrors] = useState<Partial<Record<ErrorFieldKey, string>>>({});
  const [lastGeneratedLink, setLastGeneratedLink] = useState<string | null>(null);
  const [lastGeneratedMessage, setLastGeneratedMessage] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLTextAreaElement | null>(null);

  const parsedWeight = useMemo(() => parseWeightInput(weightInput), [weightInput]);

  const estimate = useMemo(
    () =>
      calculateOrderEstimate({
        serviceCode: selectedServiceCode,
        actualWeightKg: parsedWeight.status === 'valid' ? parsedWeight.value : null,
        deliveryActive,
        perfumeActive,
      }),
    [selectedServiceCode, parsedWeight, deliveryActive, perfumeActive],
  );

  function clearFieldError(field: ErrorFieldKey) {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function focusErrorField(field: ErrorFieldKey) {
    if (field === 'estimatedWeight') {
      weightInputRef.current?.focus();
    } else if (field === 'customerName') {
      nameInputRef.current?.focus();
    } else if (field === 'pickupAddress') {
      addressInputRef.current?.focus();
    }
  }

  function handleSubmitOrder() {
    const validation = validateOrderForm({
      weightInput,
      customerName,
      deliveryActive,
      pickupAddress,
    });

    if (!validation.isValid || validation.parsedWeightKg === null) {
      setErrors(validation.errors);
      setLastGeneratedLink(null);
      setLastGeneratedMessage(null);
      if (validation.firstErrorField) {
        focusErrorField(validation.firstErrorField);
      }
      return;
    }

    setErrors({});
    setCopiedSuccess(false);

    const payload = {
      customerName: validation.trimmedName,
      pickupAddress: validation.trimmedAddress,
      orderNotes,
      deliveryActive,
      perfumeActive,
      estimate,
    };

    const message = buildWhatsAppMessage(payload);
    const waLink = buildWhatsAppDeepLink(payload, STORE_INFO.whatsappNumber);

    setLastGeneratedMessage(message);
    setLastGeneratedLink(waLink);

    const anchor = document.createElement('a');
    anchor.href = waLink;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  async function handleCopyMessage() {
    if (!lastGeneratedMessage) {
      return;
    }
    try {
      await navigator.clipboard.writeText(lastGeneratedMessage);
      setCopiedSuccess(true);
    } catch {
      setCopiedSuccess(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Kalkulator Biaya Laundry
          </h1>
          <p className="text-base text-neutral-600">
            Hitung estimasi biaya cucian Anda dan kirim pesanan lewat WhatsApp.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <ServiceCatalog
              selectedServiceCode={selectedServiceCode}
              onSelectService={(code) => {
                setSelectedServiceCode(code);
                setLastGeneratedLink(null);
              }}
            />

            <WeightInput
              ref={weightInputRef}
              weightInput={weightInput}
              onWeightChange={(value) => {
                setWeightInput(value);
                clearFieldError('estimatedWeight');
                setLastGeneratedLink(null);
              }}
              actualWeightKg={estimate.actualWeightKg}
              billedWeightKg={estimate.billedWeightKg}
              isMinimumChargeApplied={estimate.isMinimumChargeApplied}
              errorMessage={errors.estimatedWeight}
            />

            <AddOnOptions
              deliveryActive={deliveryActive}
              perfumeActive={perfumeActive}
              onToggleDelivery={() => {
                setDeliveryActive((prev) => {
                  const next = !prev;
                  if (!next) {
                    clearFieldError('pickupAddress');
                  }
                  return next;
                });
                setLastGeneratedLink(null);
              }}
              onTogglePerfume={() => {
                setPerfumeActive((prev) => !prev);
                setLastGeneratedLink(null);
              }}
              perfumeCost={estimate.perfumeCost}
              hasValidWeight={estimate.hasValidWeight}
            />

            <OrderForm
              customerName={customerName}
              pickupAddress={pickupAddress}
              orderNotes={orderNotes}
              deliveryActive={deliveryActive}
              onCustomerNameChange={(value) => {
                setCustomerName(value);
                clearFieldError('customerName');
                setLastGeneratedLink(null);
              }}
              onPickupAddressChange={(value) => {
                setPickupAddress(value);
                clearFieldError('pickupAddress');
                setLastGeneratedLink(null);
              }}
              onOrderNotesChange={(value) => {
                setOrderNotes(value);
                setLastGeneratedLink(null);
              }}
              nameError={errors.customerName}
              addressError={errors.pickupAddress}
              nameInputRef={nameInputRef}
              addressInputRef={addressInputRef}
            />
          </div>

          <div className="lg:col-span-5">
            <PriceSummaryBar
              estimate={estimate}
              deliveryActive={deliveryActive}
              perfumeActive={perfumeActive}
              onSubmitOrder={handleSubmitOrder}
              lastGeneratedLink={lastGeneratedLink}
              copiedSuccess={copiedSuccess}
              onCopyMessage={handleCopyMessage}
            />
          </div>
        </div>

        {/* Ruang kosong bawah agar konten formulir tidak tertutup bar menempel pada layar kecil */}
        <div className="h-44 lg:hidden" aria-hidden="true" />
      </main>
    </div>
  );
}
