import { motion } from 'framer-motion'

const links = ['About', 'Projects', 'AI Chat', 'Contact']

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: 'rgba(13,10,6,0.75)',
        borderBottom: '1px solid rgba(245,158,11,0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <span className="font-syne font-extrabold text-xl bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Younes.dev</span>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollTo(link)}
              className="relative text-muted hover:text-amber-100 text-sm font-medium transition-colors duration-200 group bg-transparent border-none cursor-pointer"
            >
              {link}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="mailto:younesaly.yoyo@gmail.com"
        className="px-5 py-2 rounded-full font-syne font-bold text-sm text-bg transition-all duration-200 hover:scale-105 hover:opacity-90"
        style={{ background: 'linear-gradient(135deg,#F59E0B,#F97316)' }}
      >
        Hire Me
      </a>
    </motion.nav>
  )
}
