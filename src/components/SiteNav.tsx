import { PaintRoller } from 'lucide-react'

export type NavItem = {
  id: string
  label: string
}

type Props = {
  brand: string
  logoSrc?: string
  logoAlt?: string
  items: NavItem[]
  activeId?: string
}

export default function SiteNav({ brand, logoSrc, logoAlt, items, activeId }: Props) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-hove-brown/10 bg-hove-gray/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          {logoSrc ? (
            <img src={logoSrc} alt={logoAlt ?? brand} className="h-10 w-auto object-contain sm:h-12" loading="eager" />
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-hove-brown/10">
              <PaintRoller className="h-3.5 w-3.5 text-hove-brown" aria-hidden="true" />
            </span>
          )}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  "rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hove-brown/25 focus-visible:ring-offset-2 focus-visible:ring-offset-hove-gray " +
                  (isActive
                    ? 'bg-hove-brown text-white shadow-md'
                    : 'text-hove-brown hover:bg-hove-brown/10')
                }
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <a
          href="#contact"
          className="hidden items-center justify-center rounded-full bg-hove-brown px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-transform hover:scale-105 hover:bg-hove-brown-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hove-brown/25 focus-visible:ring-offset-2 focus-visible:ring-offset-hove-gray sm:inline-flex"
        >
          Contact
        </a>
      </div>

      <nav aria-label="Primary mobile" className="border-t border-hove-brown/10 bg-hove-gray sm:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  "whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hove-brown/25 focus-visible:ring-offset-2 focus-visible:ring-offset-hove-gray " +
                  (isActive
                    ? 'bg-hove-brown text-white shadow-sm'
                    : 'text-hove-brown hover:bg-hove-brown/10')
                }
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
