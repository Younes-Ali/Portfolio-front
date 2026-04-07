import { motion } from 'framer-motion'
import TypewriterText from './TypewriterText'
import photo from '../assets/hero.jpeg'
import Counter from './Counter'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const floatIn = {
  initial: { opacity: 0, x: 40, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
}

export default function Hero() {

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="min-h-screen flex items-center px-6 pt-24 pb-16">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left: Text */}
        <div>
          <motion.div {...fadeUp(0)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 mb-7"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.35)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#F59E0B',
                  animation: 'pulseDot 2s ease infinite',
                  boxShadow: '0 0 0 0 rgba(245,158,11,0.5)',
                }}
              />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-syne font-extrabold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            Building the future,<br />
            <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">one line at a time.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="text-muted leading-relaxed mb-10 max-w-md text-base">
            <TypewriterText texts={["FrontEnd Developer", "AI Engineer", "React Specialist"]} />
            crafting intelligent, beautiful web experiences. Turning complex ideas into production-ready products.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="flex gap-4 flex-wrap mb-10">
            <button className="btn btn-warning rounded-4xl" onClick={() => scrollTo('projects')}>View Projects</button>
            <button className="btn btn-outline rounded-4xl hover:bg-transparent hover:outline-1" onClick={() => scrollTo('ai-chat')}>Ask my AI ✦</button>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="flex gap-8">
            {[['2', '+', 'Years Experience'], ['20', '+', 'Projects Built'], ['120', '+', 'Training Hours']].map(([num, suffix, label]) => (
              <div key={label} className="text-center">
                <div className="font-syne font-extrabold text-2xl gold-grad-text">
                  <Counter target={parseInt(num)} suffix={suffix} />
                </div>
                <div className="text-xs text-muted font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo Frame */}
        <motion.div {...floatIn} className="flex justify-center items-center">
          <div className="relative w-72 h-80">
            {/* Outer ring */}
            <div
              className="absolute rounded-[48px] pointer-events-none"
              style={{
                inset: '-24px',
                border: '1px solid rgba(249,115,22,0.15)',
                animation: 'rotateRing 20s linear infinite reverse',
              }}
            />
            {/* Inner ring with dot */}
            <div
              className="absolute rounded-[40px] pointer-events-none"
              style={{
                inset: '-12px',
                border: '1.5px solid rgba(245,158,11,0.3)',
                animation: 'rotateRing 12s linear infinite',
              }}
            >
              <div
                className="absolute w-2 h-2 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ background: '#F59E0B', boxShadow: '0 0 12px rgba(245,158,11,0.8)' }}
              />
            </div>

            {/* Photo box */}
            <div
              className="w-full h-full rounded-4xl overflow-hidden relative"
              style={{
                border: '1px solid rgba(245,158,11,0.25)',
              }}
            >
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge bottom-right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: 'rgba(13,10,6,0.9)', border: '1px solid rgba(245,158,11,0.3)', backdropFilter: 'blur(12px)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span className="text-xs font-semibold text-amber-400 font-syne">Open to Work</span>
            </motion.div>

            {/* Floating badge top-left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(13,10,6,0.9)', border: '1px solid rgba(249,115,22,0.3)', backdropFilter: 'blur(12px)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
              </svg>
              <span className="text-xs font-semibold text-orange-400 font-syne">2+ YOE</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CSS keyframes injected */}
      <style>{`
        @keyframes rotateRing { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes pulseDot  { 0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(245,158,11,.5) } 50% { opacity:.6; box-shadow:0 0 0 5px rgba(245,158,11,0) } }
        @keyframes iconPulse { 0%,100% { transform:scale(1) } 50% { transform:scale(1.07) } }
      `}</style>
    </section>
  )
}
