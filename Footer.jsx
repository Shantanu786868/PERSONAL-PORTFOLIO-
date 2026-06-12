import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ExternalLink, Twitter, Instagram } from 'lucide-react'

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@example.com' },
]

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 mt-20 border-t border-dark-700/50 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Shantanu Sharma</h3>
                <p className="text-sm text-gray-400">Frontend Developer</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">Passionate about creating beautiful, interactive web experiences. Let's build something amazing together.</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-xl bg-dark-800/60 border border-dark-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500/30 hover:shadow-glow-sm transition-all duration-300">
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-primary-400 transition-colors duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 inline-flex items-center gap-1">Resume <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 inline-flex items-center gap-1">Blog <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-8 pt-8 border-t border-dark-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">&copy; {currentYear} Shantanu Sharma. All rights reserved.</p>
          <p className="text-gray-400 text-sm flex items-center gap-1">Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React + Tailwind</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
