import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    icon: '💼',
    iconBg: 'rgba(59,130,246,0.15)',
    title: 'YouLance — Freelance Management SaaS Platform',
    desc: 'Full-stack SaaS platform for managing projects, clients, and invoices with an AI assistant for data querying.',
    tags: ['React', 'Strapi', 'FastAPI', 'LangChain', 'FAISS', 'Tailwind'],
    codeLink: 'https://github.com/Younes-Ali/YouLance',
    deployLink: 'https://you-lance.vercel.app/',

  },
  {
    icon: '🌍',
    iconBg: 'rgba(34,197,94,0.15)',
    title: 'Climate Change Awareness Web App',
    desc: 'React-based web application providing climate awareness with real-time weather data integration.',
    tags: ['React', 'Tailwind', 'JavaScript', 'OpenWeather API'],
    codeLink: 'https://github.com/Younes-Ali/sunset',
    deployLink: 'https://lnkd.in/dtHbTKqg',

  },
  {
    icon: '📚',
    iconBg: 'rgba(168,85,247,0.15)',
    title: 'Book Store Web Application',
    desc: 'Responsive bookstore web app with product browsing, cart system, and authentication UI.',
    tags: ['React', 'JavaScript', 'API Integration'],
    codeLink: 'https://github.com/Younes-Ali/bookstore',
    deployLink: 'https://lnkd.in/dcFWFiYm',

  },
  {
    icon: '🛒',
    iconBg: 'rgba(251,146,60,0.15)',
    title: 'Simple Store — E-commerce Web App',
    desc: 'Multi-page e-commerce interface with product listing, cart management, and responsive design.',
    tags: ['React', 'Tailwind', 'Fake Store API'],
    codeLink: 'https://github.com/Younes-Ali/Simple_Store',
    deployLink: 'https://lnkd.in/dvAbs-FR',

  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="p-6 rounded-[18px] flex flex-col gap-3 cursor-default transition-colors duration-300"
      style={{
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.18)',
        backdropFilter: 'blur(20px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)'
        e.currentTarget.style.background = 'rgba(245,158,11,0.11)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.18)'
        e.currentTarget.style.background = 'rgba(245,158,11,0.06)'
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
        style={{ background: project.iconBg }}
      >
        {project.icon}
      </div>
      <h3 className="font-syne font-bold text-base text-amber-50">{project.title}</h3>
      <p className="text-muted text-sm leading-relaxed flex-1">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[0.68rem] text-amber-300"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className='w-[60%] flex justify-between items-center'>
        <a href={project.codeLink} className="text-orange-400 text-sm font-semibold font-syne hover:underline inline-flex items-center gap-1 transition-all duration-200 hover:gap-2">
          ↗ CODE
        </a>
        <a href={project.deployLink} className="text-orange-400 text-sm font-semibold font-syne hover:underline inline-flex items-center gap-1 transition-all duration-200 hover:gap-2">
          ↗ DEPLOY
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Projects
          </motion.span>
          <motion.h2
            className="section-title mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Things I've <span className="gold-grad-text">built</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-[18px] flex flex-col items-center justify-center text-center min-h-50"
            style={{
              border: '1px dashed rgba(245,158,11,0.2)',
              background: 'transparent',
            }}
          >
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-syne font-bold text-sm text-muted">More coming soon</h3>
            <p className="text-xs text-muted mt-1 opacity-60">Always building something new...</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
