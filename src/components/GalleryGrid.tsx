import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type GalleryItem = {
  src: string
  alt: string
  label: string
}

type Props = {
  items: GalleryItem[]
  variant?: 'grid' | 'carousel'
  autoplay?: boolean
  intervalMs?: number
  showThumbnails?: boolean
}

export default function GalleryGrid({
  items,
  variant = 'grid',
  autoplay = false,
  intervalMs = 4000,
  showThumbnails = true,
}: Props) {
  const safeItems = useMemo(() => items.filter((item) => item?.src), [items])
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (variant !== 'carousel' || !autoplay || paused || safeItems.length < 2) return
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [variant, autoplay, paused, safeItems.length, intervalMs])

  useEffect(() => {
    if (activeIndex < safeItems.length) return
    setActiveIndex(0)
  }, [activeIndex, safeItems.length])

  if (variant === 'carousel') {
    const active = safeItems[activeIndex]
    return (
      <div
        className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div
          className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100"
          tabIndex={0}
          onKeyDown={(e) => {
            if (safeItems.length < 2) return
            if (e.key === 'ArrowLeft') setActiveIndex((current) => (current - 1 + safeItems.length) % safeItems.length)
            if (e.key === 'ArrowRight') setActiveIndex((current) => (current + 1) % safeItems.length)
          }}
        >
          {active ? (
            <img src={active.src} alt={active.alt} loading="lazy" className="h-full w-full object-cover" />
          ) : null}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/40 to-transparent" />

          {safeItems.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={() => setActiveIndex((current) => (current - 1 + safeItems.length) % safeItems.length)}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-zinc-900 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={() => setActiveIndex((current) => (current + 1) % safeItems.length)}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          ) : null}

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-4 text-white">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{active?.label}</div>
              <div className="mt-0.5 text-xs text-white/90">{active ? 'Recent project example' : ''}</div>
            </div>
            <div className="flex-none rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              {safeItems.length ? `${activeIndex + 1} / ${safeItems.length}` : '0 / 0'}
            </div>
          </div>
        </div>

        {showThumbnails && safeItems.length > 1 ? (
          <div className="border-t border-zinc-200 bg-white px-3 py-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {safeItems.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.src}
                    type="button"
                    className={
                      "relative flex-none overflow-hidden rounded-xl border bg-zinc-100 transition " +
                      (isActive ? 'border-amber-700 ring-2 ring-amber-700/20' : 'border-zinc-200 hover:border-zinc-300')
                    }
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" className="h-16 w-24 object-cover" />
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {safeItems.map((item) => (
        <figure key={item.src} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
          <figcaption className="px-4 py-3">
            <div className="text-sm font-semibold text-zinc-900">{item.label}</div>
            <div className="mt-0.5 text-xs text-zinc-600">Recent project example</div>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
