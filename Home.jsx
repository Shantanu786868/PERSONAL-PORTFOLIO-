import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Mail, Sparkles, Zap, Code2, Layers, Globe, Cpu, Database, Palette, Terminal, Braces, GitBranch, Star, ChevronDown, Play, ExternalLink, Heart, MessageCircle, Users, TrendingUp, Award, Briefcase, Rocket, Target, Lightbulb } from 'lucide-react'

const floatingIcons = [
  { icon: Code2, delay: 0, x: -120, y: -80, color: 'primary' },
  { icon: Globe, delay: 0.5, x: 150, y: -60, color: 'secondary' },
  { icon: Cpu, delay: 1, x: -100, y: 100, color: 'accent' },
  { icon: Database, delay: 1.5, x: 120, y: 80, color: 'primary' },
  { icon: Palette, delay: 2, x: -150, y: 20, color: 'secondary' },
  { icon: Terminal, delay: 2.5, x: 140, y: -10, color: 'accent' },
  { icon: Braces, delay: 3, x: -80, y: -120, color: 'primary' },
  { icon: GitBranch, delay: 3.5, x: 90, y: 120, color: 'secondary' },
]

const journeySteps = [
  {
    year: 'The Beginning',
    title: 'Started Coding Journey',
    description: 'Discovered the world of programming and fell in love with creating digital experiences.',
    icon: Lightbulb,
    color: 'primary',
  },
  {
    year: 'Building Skills',
    title: 'Mastered Frontend',
    description: 'Deep dive into React, TypeScript, and modern web technologies.',
    icon: Code2,
    color: 'secondary',
  },
  {
    year: 'Real Projects',
    title: 'Shipped Products',
    description: 'Built and deployed multiple projects solving real-world problems.',
    icon: Rocket,
    color: 'accent',
  },
  {
    year: 'Today',
    title: 'Creating Impact',
    description: 'Crafting beautiful, performant web applications that users love.',
    icon: Target,
    color: 'primary',
  },
]

const featuredProjects = [
  {
    id: 1,
    title: 'LearnFlow',
    description: 'Modern e-learning platform with interactive courses and progress tracking.',
    image: 'https://images.pexels.com/photos/5428832/pexels-photo-5428832.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'TypeScript', 'Node.js'],
    color: 'primary',
    stats: { users: '10K+', rating: '4.9' },
  },
  {
    id: 2,
    title: 'TaskFlow Pro',
    description: 'Project management tool with real-time collaboration features.',
    image: 'https://images.pexels.com/photos/5212702/pexels-photo-5212702.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'Prisma', 'PostgreSQL'],
    color: 'secondary',
    stats: { users: '5K+', rating: '4.8' },
  },
  {
    id: 3,
    title: 'Analytics Hub',
    description: 'Data visualization platform with beautiful charts and insights.',
    image: 'https://images.pexels.com/photos/5740715/pexels-photo-5740715.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'D3.js', 'Python'],
    color: 'accent',
    stats: { users: '2K+', rating: '4.7' },
  },
]

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Engineer at Google',
    content: 'Exceptional attention to detail and deep understanding of modern web architecture. A rare combination of design sensibility and technical excellence.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    color: 'primary',
  },
  {
    name: 'Sarah Miller',
    role: 'Founder at TechStartup',
    content: 'Delivered our product ahead of schedule with features we hadn\'t even imagined. Truly understands how to build products users love.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    color: 'secondary',
  },
  {
    name: 'James Wilson',
    role: 'CTO at FinanceApp',
    content: 'The code quality is outstanding. Every component is thoughtfully architected and thoroughly tested. Highly recommend.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    color: 'accent',
  },
]

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const scale = useSpring(heroScale, springConfig)
  const y = useSpring(heroY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 80%, rgba(139,92,246,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, rgba(6,182,212,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ scale, y }}
        className="min-h-screen flex items-center justify-center px-4 pt-20 relative"
      >
        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
                x: `${item.x}px`,
                y: `${item.y}px`,
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-${item.color}-500/20 backdrop-blur-xl border border-${item.color}-500/30 flex items-center justify-center shadow-lg`}
              style={{
                transform: `translate(${item.x}px, ${item.y}px) translate(-50%, -50%) perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`,
              }}
            >
              <item.icon className={`w-8 h-8 text-${item.color}-400`} />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-primary-500/20 backdrop-blur-xl mb-6"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative flex h-2 w-2"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </motion.span>
                <span className="text-sm text-gray-300">Available for new opportunities</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
              >
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="gradient-text">Shantanu</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-16 mb-8"
              >
                <TypeAnimation
                  sequence={[
                    'Frontend Developer',
                    2000,
                    'React Specialist',
                    2000,
                    'UI/UX Enthusiast',
                    2000,
                    'Problem Solver',
                    2000,
                  ]}
                  wrapper="div"
                  speed={50}
                  repeat={Infinity}
                  className="text-2xl md:text-3xl text-gray-300 font-medium"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed"
              >
                Crafting exceptional digital experiences with cutting-edge technologies.
                Building products that are not just functional, but delightful to use.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link
                  to="/projects"
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl font-semibold text-white overflow-hidden shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="relative flex items-center gap-2">
                    View Projects
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <a
                  href="/resume.pdf"
                  download
                  className="group px-8 py-4 bg-dark-800/60 backdrop-blur-xl border border-dark-700 rounded-2xl font-semibold text-white hover:border-primary-500/50 hover:bg-dark-800 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Resume
                  </span>
                </a>

                <Link
                  to="/contact"
                  className="px-8 py-4 text-gray-300 hover:text-white font-medium transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact
                  </span>
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-6"
              >
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 3).map((t, i) => (
                    <motion.img
                      key={i}
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full border-2 border-dark-800 object-cover"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center border-2 border-dark-800 text-xs font-bold text-white">
                    +50
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-gray-300 font-medium">Trusted by 50+ happy clients</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-gray-400 ml-1">5.0 average rating</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right - 3D Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
                }}
              >
                {/* Glowing Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/30 via-secondary-500/30 to-accent-500/30 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Orbiting Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 border border-dashed border-primary-500/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-16 border border-dashed border-secondary-500/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-24 border border-dashed border-accent-500/10 rounded-full"
                />

                {/* Main Image Container */}
                <motion.div
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Glassmorphism Frame */}
                  <div className="absolute inset-0 bg-dark-800/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl" />

                  {/* Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/50 via-transparent to-secondary-500/50" style={{ padding: '2px' }}>
                    <div className="w-full h-full rounded-3xl bg-dark-900" />
                  </div>

                  {/* Profile Image */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                  </div>

                  {/* Floating Badges */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -right-4 top-1/4 bg-dark-800/80 backdrop-blur-xl border border-primary-500/30 rounded-2xl px-4 py-2 shadow-lg shadow-primary-500/10"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary-400" />
                      <span className="text-sm text-white font-medium">React Expert</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute -left-4 bottom-1/4 bg-dark-800/80 backdrop-blur-xl border border-accent-500/30 rounded-2xl px-4 py-2 shadow-lg shadow-accent-500/10"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent-400" />
                      <span className="text-sm text-white font-medium">Fast Learner</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 }}
                    className="absolute left-1/2 -translate-x-1/2 -bottom-4 bg-dark-800/80 backdrop-blur-xl border border-secondary-500/30 rounded-2xl px-4 py-2 shadow-lg shadow-secondary-500/10"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-secondary-400" />
                      <span className="text-sm text-white font-medium">Full Stack</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3D Journey Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 mb-6"
            >
              <Rocket className="w-8 h-8 text-primary-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              The Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From curious beginner to building products that matter
            </p>
          </motion.div>

          {/* 3D Timeline */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-24">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        rotateY: index % 2 === 0 ? -5 : 5,
                      }}
                      className="group relative p-8 rounded-3xl bg-dark-800/40 backdrop-blur-xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-500"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-${step.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />

                      <div className={`inline-flex items-center gap-2 text-${step.color}-400 text-sm font-medium mb-4`}>
                        <step.icon className="w-4 h-4" />
                        {step.year}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>

                      {/* Corner Accent */}
                      <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 bg-gradient-to-b from-${step.color}-500/50 to-transparent rounded-full`} />
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-${step.color}-500/20 border-2 border-${step.color}-500/50 flex items-center justify-center hidden md:flex`}
                  >
                    <step.icon className={`w-6 h-6 text-${step.color}-400`} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Code2, value: '50+', label: 'Projects Delivered', color: 'primary' },
              { icon: Users, value: '50+', label: 'Happy Clients', color: 'secondary' },
              { icon: Award, value: '15+', label: 'Awards Won', color: 'accent' },
              { icon: Star, value: '5.0', label: 'Average Rating', color: 'primary' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                }}
                className="group p-6 rounded-3xl bg-dark-800/40 backdrop-blur-xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-500 text-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-${stat.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}-400`} />
                </div>
                <h3 className="text-4xl font-bold gradient-text mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500/20 to-accent-500/20 border border-secondary-500/30 mb-6"
            >
              <Briefcase className="w-8 h-8 text-secondary-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Featured Work
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Projects that showcase passion, precision, and performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                className="group relative rounded-3xl overflow-hidden bg-dark-800/40 backdrop-blur-xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />

                  {/* Overlay Stats */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div
                        key={key}
                        className={`px-3 py-1.5 rounded-full bg-${project.color}-500/20 backdrop-blur-xl border border-${project.color}-500/30 text-xs font-medium text-${project.color}-400`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-dark-700/50 text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <a
                      href="#"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-medium hover:bg-primary-500/20 transition-all"
                    >
                      <Play className="w-4 h-4" />
                      Demo
                    </a>
                    <a
                      href="#"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-700/50 border border-dark-600 text-gray-300 text-sm font-medium hover:bg-dark-700 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Details
                    </a>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-3xl bg-${project.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-dark-800/60 backdrop-blur-xl border border-dark-700 rounded-2xl font-semibold text-white hover:border-primary-500/50 transition-all duration-300"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500/20 to-primary-500/20 border border-accent-500/30 mb-6"
            >
              <MessageCircle className="w-8 h-8 text-accent-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Kind Words
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From people who've worked with me
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5, rotateY: 5 }}
                className="group relative p-8 rounded-3xl bg-dark-800/40 backdrop-blur-xl border border-dark-700/50 hover:border-primary-500/30 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Quote Mark */}
                <div className="absolute top-6 right-6 text-6xl text-primary-500/10 font-serif">"</div>

                {/* Content */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Accent Border */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${testimonial.color}-500 to-${testimonial.color}-400 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-secondary-600/20 to-accent-600/20 backdrop-blur-3xl" />
            <motion.div
              className="absolute inset-0 bg-gradient-primary opacity-20"
              animate={{
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10" />

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Let's Build Something Amazing
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
                Have a project in mind? I'd love to hear about it. Let's create something
                extraordinary together.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="group flex items-center gap-2 px-8 py-4 bg-white rounded-2xl font-semibold text-dark-900 hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-white/10"
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl font-semibold text-white hover:bg-white/20 transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
