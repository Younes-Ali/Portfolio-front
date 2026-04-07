import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import TagsCarousel from './TagsCarousel'

const skills = [
  {
    label: 'Frontend',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend & AI',
    tags: ['Python', 'FastAPI', 'LangChain', 'FAISS', 'Strapi'],
  },
  {
    label: 'Tools & Infra',
    tags: ['Git Hub', 'Vercel', 'VScode', 'Postman'],
  },
]

function RevealBlock({ children, direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 36 : 0,
      x: direction === 'left' ? -36 : direction === 'right' ? 36 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealBlock>
          <span className="section-label">About Me</span>
        </RevealBlock>
        <RevealBlock delay={0.1}>
          <h2 className="section-title mb-12">
            Passionate about <span className="gold-grad-text">great software</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <RevealBlock direction="left" delay={0.1}>
            <div className="space-y-4 text-muted leading-relaxed text-[0.96rem]">
              <p>
                I'm a FrontEnd Developer and AI Engineer with 2+ years of experience building modern web
                applications and intelligent systems. I specialize in React, Python, and cutting-edge AI technologies.
              </p>
              <p>
                I love turning complex problems into elegant, user-friendly solutions — from pixel-perfect
                frontends to scalable backend architectures and AI-powered products.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open source, writing technical articles,
                or exploring the latest in AI research.
              </p>
            </div>
          </RevealBlock>

          {/* Skills */}
          <RevealBlock direction="right" delay={0.2}>
            <h3 className="font-syne font-bold text-base text-amber-50 mb-5">Tech Stack</h3>
            <div className="space-y-4">
              {skills.map(({ label, tags }) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    <TagsCarousel tags={tags} dir={'rtl'} />
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  )
}
