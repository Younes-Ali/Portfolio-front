import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import AgentChat from './components/AgentChat'
import Footer from './components/Footer'

// Ambient background blobs + grid
const Background = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    {/* Grid */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
    {/* Glow blobs */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse 55% 45% at 5% 0%, rgba(245,158,11,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 45% 40% at 95% 85%, rgba(249,115,22,0.16) 0%, transparent 60%),
          radial-gradient(ellipse 35% 30% at 55% 45%, rgba(251,191,36,0.06) 0%, transparent 60%)
        `,
      }}
    />
  </div>
)

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-amber-50 font-dm overflow-x-hidden">
      <Background />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <AgentChat />
      </main>
      <Footer />
    </div>
  )
}
