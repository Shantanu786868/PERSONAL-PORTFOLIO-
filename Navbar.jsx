import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User } from 'lucide-react'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
]

function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
              <span className="text-xl md:text-2xl font-bold text-white">S</span>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-white">Shantanu</h1>
              <p className="text-xs text-gray-400">Portfolio</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-primary-400' : 'text-gray-300 hover:text-white'}`}>
                {link.name}
                {location.pathname === link.path && <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800/60 border border-primary-500/30 text-white hover:bg-primary-500/20 transition-all duration-300">
                <User className="w-4 h-4" /><span className="text-sm font-medium">Dashboard</span>
              </Link>
            ) : (
              <Link to="/login" className="btn-primary flex items-center gap-2 text-sm !py-2.5">
                <User className="w-4 h-4" /><span>Login</span>
              </Link>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-dark-800/95 backdrop-blur-xl border-t border-dark-700/50">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link to={link.path} className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${location.pathname === link.path ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'text-gray-300 hover:bg-dark-700/50 hover:text-white'}`}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.05 }} className="pt-2">
                {user ? (
                  <Link to="/dashboard" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium">
                    <User className="w-5 h-5" /><span>Dashboard</span>
                  </Link>
                ) : (
                  <Link to="/login" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium">
                    <User className="w-5 h-5" /><span>Login</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
