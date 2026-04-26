'use client'

import Image from 'next/image'
import type { GearProduct } from '@/lib/gear-data'

const tierLabels: Record<GearProduct['tier'], { label: string; cls: string }> = {
  starter: {
    label: 'Starter',
    cls: 'bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/20',
  },
  growth: {
    label: 'Growth',
    cls: 'bg-blue-500/[0.08] text-blue-400 border-blue-500/20',
  },
  pro: {
    label: 'Pro',
    cls: 'bg-purple-500/[0.08] text-purple-400 border-purple-500/20',
  },
}

function formatPrice(low: number, high: number): string {
  if (low === 0 && high === 0) return 'Free'
  if (low === high) return `$${low}`
  return `$${low}–${high}`
}

function trackClick(slug: string, brand: string) {
  // Send GA4 event if available
  if (typeof window !== 'undefined' && (window as Window & { gtag?: unknown }).gtag) {
    ;(window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      'event',
      'affiliate_click',
      {
        product_slug: slug,
        product_brand: brand,
      }
    )
  }
}

export default function GearCard({ product }: { product: GearProduct }) {
  const tierInfo = tierLabels[product.tier]
  const hasImage = product.imagePath !== ''
  const hasAmazon = !!product.amazonUrl

  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-red/15 transition-colors overflow-hidden flex flex-col">
      {/* Image */}
      {hasImage && (
        <div className="relative aspect-[4/3] bg-white/[0.02] overflow-hidden">
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              // Hide if image missing
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          {product.aaronUses && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-red text-white font-body text-[0.6rem] font-bold tracking-wider uppercase shadow-lg">
              Aaron Uses
            </div>
          )}
        </div>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Tier + brand */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex px-2 py-0.5 rounded-md border text-[0.55rem] font-body font-bold tracking-wider uppercase ${tierInfo.cls}`}
          >
            {tierInfo.label}
          </span>
          <span className="font-body text-[0.65rem] text-brand-cream/35">
            {product.brand}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-display text-base sm:text-lg font-normal uppercase text-brand-cream leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="mt-2 font-display text-xl font-normal uppercase text-brand-red">
          {formatPrice(product.priceLow, product.priceHigh)}
        </div>

        {/* Notes */}
        <p className="mt-3 font-body text-xs text-brand-cream/55 leading-relaxed">
          {product.notes}
        </p>

        {/* Why list */}
        {product.why.length > 0 && (
          <ul className="mt-3 space-y-1 flex-1">
            {product.why.slice(0, 3).map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-brand-cream/55 font-body text-xs"
              >
                <svg
                  className="w-3 h-3 text-brand-red flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {reason}
              </li>
            ))}
          </ul>
        )}

        {/* Use case */}
        {product.useCase && (
          <p className="mt-3 pt-3 border-t border-white/[0.04] font-body text-[0.7rem] text-brand-cream/40 italic leading-relaxed">
            {product.useCase}
          </p>
        )}

        {/* Buy buttons */}
        {hasAmazon && (
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => trackClick(product.slug, product.brand)}
            className="mt-4 block w-full text-center py-3 rounded-lg bg-brand-red text-white font-body font-bold text-sm hover:bg-brand-red-light transition-colors"
          >
            Buy on Amazon
          </a>
        )}
      </div>
    </div>
  )
}
