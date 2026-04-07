import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TagsCarousel({ tags, dir }) {
    const trackRef = useRef(null)


    useEffect(() => {
    const track = trackRef.current
    const wrapper = track?.parentElement
    if (!track || !wrapper) return

    let animationId
    let position = 0
    let paused = false
    const speed = dir === 'rtl' ? 0.5 : -0.5  // ← التغيير هنا

    const animate = () => {
        if (!paused) {
            position += speed  // ← بدل -= خلها +=
            
            if (dir === 'rtl') {
                // من اليسار لليمين
                if (position >= 0) position = -(track.scrollWidth / 2)
            } else {
                // من اليمين لليشمال (الافتراضي)
                if (Math.abs(position) >= track.scrollWidth / 2) position = 0
            }

            track.style.transform = `translateX(${position}px)`
        }
        animationId = requestAnimationFrame(animate)
    }

    wrapper.addEventListener('mouseenter', () => paused = true)
    wrapper.addEventListener('mouseleave', () => paused = false)

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
}, [dir])  // ← اضفت dir في الـ dependency array

    // بنعمل نسختين من الـ tags عشان يبان infinite
    const doubled = [...tags, ...tags, ...tags, ...tags] // quadruple for smoother loop

    return (
        <div className="overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div ref={trackRef} className="flex gap-2 w-max">
                {doubled.map((tag, i) => (
                    <motion.span
                        key={i}
                        whileHover={{ scale: 1.07 }}
                        className="px-3 py-1 rounded-full text-xs font-medium text-amber-300 cursor-default whitespace-nowrap"
                        style={{
                            background: 'rgba(245,158,11,0.08)',
                            border: '1px solid rgba(245,158,11,0.2)',
                            transition: 'background 0.2s',
                        }}
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>
        </div>
    )
}