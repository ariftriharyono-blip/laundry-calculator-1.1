/**
 * Komponen formulir data pemesan: nama, alamat penjemputan kondisional, dan catatan khusus (FT-05).
 */

import type { RefObject } from 'react';
import { AlertCircle } from 'lucide-react';
import { STORE_INFO } from '../config';

interface OrderFormProps {
  customerName: string;
  pickupAddress: string;
  orderNotes: string;
  deliveryActive: boolean;
  onCustomerNameChange: (value: string) => void;
  onPickupAddressChange: (value: string) => void;
  onOrderNotesChange: (value: string) => void;
  nameError?: string;
  addressError?: string;
  nameInputRef: RefObject<HTMLInputElement | null>;
  addressInputRef: RefObject<HTMLTextAreaElement | null>;
}

export function OrderForm({
  customerName,
  pickupAddress,
  orderNotes,
  deliveryActive,
  onCustomerNameChange,
  onPickupAddressChange,
  onOrderNotesChange,
  nameError,
  addressError,
  nameInputRef,
  addressInputRef,
}: OrderFormProps) {
  const hasNameError = Boolean(nameError);
  const hasAddressError = Boolean(addressError);

  return (
    <section aria-labelledby="heading-pemesan" className="rounded-2xl bg-white p-4 sm:p-6">
      <div className="space-y-4">
        <h2 id="heading-pemesan" className="text-lg font-semibold text-neutral-900">
          Data Pemesan
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Pemesan
          </label>
          <input
            ref={nameInputRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            placeholder="mis. Budi Santoso"
            value={customerName}
            onChange={(event) => onCustomerNameChange(event.target.value)}
            aria-invalid={hasNameError}
            aria-describedby={hasNameError ? 'customer-name-error' : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              hasNameError ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {hasNameError && (
            <div
              id="customer-name-error"
              role="alert"
              className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{nameError}</span>
            </div>
          )}
        </div>

        {deliveryActive ? (
          <div className="space-y-2">
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={addressInputRef}
              id="pickup-address"
              name="pickupAddress"
              autoComplete="street-address"
              rows={2}
              placeholder="mis. Jl. Melati No. 12, dekat minimarket"
              value={pickupAddress}
              onChange={(event) => onPickupAddressChange(event.target.value)}
              aria-invalid={hasAddressError}
              aria-describedby={
                hasAddressError ? 'pickup-address-help pickup-address-error' : 'pickup-address-help'
              }
              className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                hasAddressError ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <p id="pickup-address-help" className="text-sm text-neutral-600">
              Maksimal radius {STORE_INFO.pickupRadiusMaxKm} km dari toko.
            </p>
            {hasAddressError && (
              <div
                id="pickup-address-error"
                role="alert"
                className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{addressError}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">
            Pengantaran: Antar sendiri ke toko (aktifkan Antar-Jemput jika ingin dijemput).
          </p>
        )}

        <div className="space-y-2">
          <label
            htmlFor="order-notes"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus
          </label>
          <textarea
            id="order-notes"
            name="orderNotes"
            rows={2}
            placeholder="mis. Pisahkan baju putih"
            value={orderNotes}
            onChange={(event) => onOrderNotesChange(event.target.value)}
            aria-describedby="order-notes-help"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
          <p id="order-notes-help" className="text-sm text-neutral-600">
            Opsional, misalnya pisahkan baju putih.
          </p>
        </div>
      </div>
    </section>
  );
}
