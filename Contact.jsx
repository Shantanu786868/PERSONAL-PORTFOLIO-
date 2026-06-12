import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, MessageSquare, Send, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'contact@example.com', href: 'mailto:contact@example.com', color: 'primary' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210', color: 'secondary' },
  { icon: MapPin, label: 'Location', value: 'Delhi, India', href: '#', color: 'accent' },
]

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
]

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    switch (name) {
      case 'name': return !value.trim() ? 'Name is required' : value.trim().length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email': if (!value.trim()) return 'Email is required'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'; return ''
      case 'subject': return !value.trim() ? 'Subject is required' : value.trim().length < 5 ? 'Subject must be at least 5 characters' : ''
      case 'message': return !value.trim() ? 'Message is required' : value.trim().length < 20 ? 'Message must be at least 20 characters' : ''
      default: return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    Object.keys(formData).forEach((key) => { const error = validateField(key, formData[key]); if (error) newErrors[key] = error })
    setErrors(newErrors)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(newErrors).length > 0) return
    setStatus('loading')
    setTimeout(() => { setStatus('success'); setFormData({ name: '', email: '', subject: '', message: '' }); setTouched({}); setTimeout(() => setStatus('idle'), 5000) }, 1500)
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="section-title gradient-text">Get In Touch</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Have a project in mind? I'd love to hear from you</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a key={index} href={info.href} whileHover={{ x: 5 }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-700/30 transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-${info.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <info.icon className={`w-5 h-5 text-${info.color}-400`} />
                    </div>
                    <div><p className="text-gray-400 text-sm">{info.label}</p><p className="text-white font-medium">{info.value}</p></div>
                  </motion.a>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-dark-700/50">
                <h3 className="text-gray-400 text-sm mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-xl bg-dark-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700 transition-all">
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Send a Message</h2>
                  <p className="text-gray-400 text-sm">I'll get back to you within 24 hours</p>
                </div>
              </div>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div><p className="text-green-400 font-medium">Message sent successfully!</p><p className="text-green-400/70 text-sm">Thank you for reaching out.</p></div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm mb-2">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder="John Doe" className={`input-field pl-12 ${errors.name && touched.name ? 'border-red-500/50' : ''}`} />
                    </div>
                    {errors.name && touched.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm mb-2">Your Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder="john@example.com" className={`input-field pl-12 ${errors.email && touched.email ? 'border-red-500/50' : ''}`} />
                    </div>
                    {errors.email && touched.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-300 text-sm mb-2">Subject</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} onBlur={handleBlur} placeholder="Project Inquiry" className={`input-field pl-12 ${errors.subject && touched.subject ? 'border-red-500/50' : ''}`} />
                  </div>
                  {errors.subject && touched.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} placeholder="Tell me about your project..." rows={5} className={`input-field resize-none ${errors.message && touched.message ? 'border-red-500/50' : ''}`} />
                  {errors.message && touched.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                  {status === 'loading' ? (<><Loader2 className="w-5 h-5 animate-spin" />Sending...</>) : (<><Send className="w-5 h-5" />Send Message</>)}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
