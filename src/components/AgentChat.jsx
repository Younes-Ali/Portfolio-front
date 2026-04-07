import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const API_URL = 'https://pseudomonastical-interestedly-cristy.ngrok-free.dev/api/chat' // backend endpoint

const suggestions = [
  "What are your main skills?",
  "Tell me about your projects",
  "Are you available for hire?",
  "What is your experience?",
]

function TypingIndicator() {
  return (
    <motion.div
      className="flex gap-2 px-4 py-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-amber-400"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  )
}

function Message({ msg }) {
  const isAi = msg.role === 'ai'
  return (
    <motion.div
      className={`flex gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0`}
        style={isAi
          ? { background: 'linear-gradient(135deg,#F59E0B,#F97316)', color: '#0D0A06' }
          : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#A8967A' }}
      >
        {isAi ? '✦' : 'U'}
      </div>
      {/* Bubble */}
      <div className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed`}
        style={isAi
          ? { background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '4px 16px 16px 16px', color: '#FEF3C7' }
          : { background: 'linear-gradient(135deg,rgba(245,158,11,0.35),rgba(249,115,22,0.25))', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '16px 4px 16px 16px', color: '#FEF3C7' }}
      >
        {msg.text}
      </div>
    </motion.div>
  )
}

export default function AgentChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hey there! I'm Younes's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (messages.length <= 1) return  // ← تجاهل الـ initial message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const q = text || input.trim()
    if (!q || loading) return

    setShowSuggestions(false)
    setMessages(prev => [...prev, { role: 'user', text: q }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.answer }])
    } catch {
      const fallbacks = {
        skills: "Younes is skilled in React.js, Python.",
        project: "Younes has built 4 major projects including AI Portfolio Assistant and SmartTask AI.",
        experience: "Younes has 2+ years experience as FrontEnd Developer.",
        hire: "Tell me your offer",
      }
      const key = Object.keys(fallbacks).find(k => q.toLowerCase().includes(k))
      setMessages(prev => [...prev, { role: 'ai', text: key ? fallbacks[key] : "I'm in demo mode. Ask about skills, projects, or experience!" }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="ai-chat" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="section-label">AI Assistant</span>
          <h2 className="section-title mb-3">Ask me <span className="gold-grad-text">anything</span></h2>
          <p className="text-muted text-sm max-w-md mx-auto">Powered by LangChain + FAISS. Ask about my skills, projects, or experience!</p>
        </motion.div>

        {/* Chat Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto rounded-[22px] overflow-hidden"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)', backdropFilter: 'blur(24px)' }}
        >
          {/* Messages */}
          <div className="flex flex-col gap-4 p-6 min-h-70 max-h-90 overflow-y-auto">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            <AnimatePresence>{loading && <TypingIndicator />}</AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div className="flex flex-wrap gap-2 px-6 pb-4" exit={{ opacity: 0, height: 0 }}>
                {suggestions.map(s => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-xs px-3 py-1.5 rounded-full cursor-pointer font-medium text-amber-300 hover:scale-105 transition"
                    style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.3)' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.15)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.06)'}
                  >{s}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="flex gap-3 items-center px-6 py-4" style={{ borderTop: '1px solid rgba(245,158,11,0.15)' }}>
            <input
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none text-amber-50 placeholder-muted transition-all duration-200"
              style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.18)' }}
              placeholder="Ask anything about Younes..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(245,158,11,0.18)'}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg,#F59E0B,#F97316)', color: '#0D0A06' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}