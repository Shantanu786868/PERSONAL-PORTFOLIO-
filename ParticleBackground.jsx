import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function ParticleBackground() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-900 to-dark-900" />

      <motion.div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />

      {particles.map((particle) => (
        <motion.div key={particle.id} className="absolute rounded-full bg-primary-500/20" style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size, height: particle.size }} animate={{ y: [0, -30, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }} />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,dark-900_70%)]" />
    </div>
  )
}

export default ParticleBackground
