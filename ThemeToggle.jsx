import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-dark-800/80 backdrop-blur-xl border border-dark-700/50 flex items-center justify-center text-gray-300 hover:text-white hover:border-primary-500/30 hover:shadow-glow-sm transition-all duration-300" aria-label="Toggle theme">
      <motion.div initial={false} animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
