import SiteNav, { type NavItem } from '@/components/SiteNav'
import ContactForm from '@/components/ContactForm'
import ImageSlideshow from '@/components/ImageSlideshow'
import { useActiveSection } from '@/hooks/useActiveSection'

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
]

const brandLogoSrc = '/projects/logo-transparent.png'

const featureImages = [
  { src: '/projects/puff/puff-01.jpg', alt: 'Fresh interior painting and finish' },
  { src: '/projects/puff/puff-02.jpg', alt: 'Staircase painting and woodwork finish' },
  { src: '/projects/puff/puff-03.jpg', alt: 'Hallway painting and decorating finish' },
]

const galleryItems = Array.from({ length: 20 }, (_, i) => ({
  label: 'Recent Project',
  alt: `Gallery image of recent work ${i + 1}`,
  src: `/projects/project-${i + 1}.jpg`,
}))

export default function Home() {
  const activeId = useActiveSection(navItems.map((n) => n.id))

  return (
    <div className="min-h-screen bg-hove-gray text-hove-brown font-sans selection:bg-hove-gold selection:text-white">
      <SiteNav brand="Hove Painting Contractors" logoSrc={brandLogoSrc} logoAlt="Hove Painting Contractors logo" items={navItems} activeId={activeId} />

      <main>
        <section id="home" className="scroll-mt-20 bg-hove-gray px-6 pb-16 pt-24 lg:pt-32">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto mt-10 flex h-72 w-72 items-center justify-center animate-fade-in lg:h-80 lg:w-80">
              <img src={brandLogoSrc} alt="Hove Painting Contractors" className="h-full w-full scale-125 object-contain origin-top drop-shadow-sm" />
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-center text-base leading-loose text-hove-brown/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-lg font-medium">Painting and decorating services in Brighton &amp; Hove and across Sussex.</p>
              <p className="mt-4">
                With over 25 years’ experience and full NVQ &amp; City &amp; Guilds qualifications, we deliver a superior finish for both residential and commercial properties — every time.
              </p>
            </div>
          </div>
        </section>

        <section id="developers" className="scroll-mt-20 bg-hove-gray px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-bold tracking-widest text-hove-brown/80 uppercase">Painting Contractors for Developers &amp; Main Contractors in Sussex</div>

            <div className="mt-6 space-y-5 text-base leading-loose text-hove-brown/90">
              <p>
                Whether you're refreshing a single room or completing a full property transformation, we focus on precision, professionalism and outstanding service from start to finish.
              </p>
              <p>
                We work closely with property developers, construction companies and main contractors across Sussex, providing dependable painting and decorating services for new build housing, small developments and refurbishment projects.
              </p>
              <p>
                As experienced painting contractors in Sussex, we understand the pressures of programme deadlines, site coordination and quality control. Our team is used to working within live construction environments, adhering to health and safety requirements, RAMS documentation and site management procedures.
              </p>
            </div>

            <div className="mt-10 space-y-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="mx-auto w-full max-w-sm lg:order-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hove-brown/10 bg-white/30 shadow-sm">
                    <img src={featureImages[0].src} alt={featureImages[0].alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-4 text-base leading-loose text-hove-brown/90 lg:order-1">
                  <p>
                    From multi-plot residential developments to bespoke homes and commercial refurbishments, we deliver:
                  </p>
                  <div className="space-y-2">
                    <div>New build mist coats and full plot decoration</div>
                    <div>Internal and external painting packages</div>
                    <div>Spray finishes for consistent, high-quality results</div>
                    <div>Timber, cladding and exterior masonry coatings</div>
                    <div>Snagging and final handover touch-ups</div>
                    <div>Ongoing support for phased developments</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="mx-auto w-full max-w-sm">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hove-brown/10 bg-white/30 shadow-sm">
                    <img src={featureImages[1].src} alt={featureImages[1].alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-4 text-base leading-loose text-hove-brown/90">
                  <p>
                    We pride ourselves on reliability, clear communication and maintaining clean, organised work areas on site. Our focus is simple: deliver a high standard of finish while keeping your project on schedule.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="mx-auto w-full max-w-sm lg:order-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-hove-brown/10 bg-white/30 shadow-sm">
                    <img src={featureImages[2].src} alt={featureImages[2].alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-4 text-base leading-loose text-hove-brown/90 lg:order-1">
                  <p>
                    If you are a developer or main contractor looking for a professional painting subcontractor in Sussex, we would welcome the opportunity to tender for upcoming projects and build a long-term working relationship.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-hove-brown px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-transform hover:scale-105 hover:bg-hove-brown-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hove-brown/25 focus-visible:ring-offset-2 focus-visible:ring-offset-hove-gray"
                  >
                    Contact us today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 bg-hove-gray px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-xs font-bold tracking-widest text-hove-brown/80 uppercase">⭐ ABOUT US</div>
            <div className="mt-8 space-y-6 text-base leading-loose text-hove-brown/90">
              <p>At Hove Painting Contractors, we are passionate about quality, craftsmanship and customer satisfaction.</p>
              <p>
                For over 25 years, we've been working on commercial and domestic sites across the UK. As a highly experienced, fully insured painters with NVQ and City &amp; Guilds qualifications, we bring deep industry knowledge and meticulous attention to detail to every job.
              </p>
              <p className="font-medium">We believe in:</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <span className="text-hove-brown/70">✓</span> A flawless finish
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-hove-brown/70">✓</span> Clear communication
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-hove-brown/70">✓</span> Friendly, reliable service
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-hove-brown/70">✓</span> Respecting your space and schedule
                </div>
              </div>
              <p>Your project deserves expertise — and we deliver exactly that.</p>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-hove-gray px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-xs font-bold tracking-widest text-hove-brown/80 uppercase">⭐ SERVICES</div>
            <div className="mt-8 space-y-6 text-base leading-loose text-hove-brown/90">
              <p>We offer bespoke painting and decorating services for both residential and commercial properties.</p>
              <p className="font-medium">Our services include:</p>
              <div className="grid gap-y-4 gap-x-8 sm:grid-cols-2">
                <div>🎨 Interior Painting &amp; Decorating</div>
                <div>🎨 Exterior Painting</div>
                <div>🎨 Wallpapering &amp; Surface Preparation</div>
                <div>🎨 Door &amp; Window Painting</div>
                <div>🎨 Specialist Finishes</div>
                <div>🎨 Colour Consultation</div>
                <div className="pt-2">🎨 Airless spraying</div>
              </div>
              <p>
                Each project is tailored to your needs, ensuring a professional result with a smooth, stress-free experience from start to finish.
              </p>
            </div>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-20 bg-hove-gray px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-bold tracking-widest text-hove-brown/80 uppercase mb-8">⭐ GALLERY / PROJECTS</div>
            <ImageSlideshow images={galleryItems} />
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-hove-gray px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-bold tracking-widest text-hove-brown/80 uppercase">⭐ CONTACT</div>
            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-start">
              <div className="space-y-8 text-base leading-loose text-hove-brown/90">
                <p className="text-lg font-medium">Ready to transform your space?</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="text-xl">📍</span>
                    <div>Based in Brighton, serving Brighton &amp; Hove and Sussex</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl">📞</span>
                    <div>
                      Phone: <a href="tel:07802400396" className="font-semibold text-hove-brown underline-offset-4 hover:underline">07802-400396</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl">📧</span>
                    <div>
                      Email:{' '}
                      <a href="mailto:hovecontracting@gmail.com" className="font-semibold text-hove-brown underline-offset-4 hover:underline break-all">
                        hovecontracting@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <p>Or simply fill in the contact form — we’ll get back to you promptly.</p>
              </div>
              <div className="lg:pt-1">
                <ContactForm emailTo="hovecontracting@gmail.com" />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-hove-brown text-hove-gray py-12 px-6 text-center text-sm opacity-90">
        <p>&copy; {new Date().getFullYear()} Hove Painting Contractors. All rights reserved.</p>
      </footer>
    </div>
  )
}
