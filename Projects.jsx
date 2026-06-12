import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ExternalLink, Github, Code2, Globe, Palette, Filter } from 'lucide-react'

const allProjects = [
  { id: 1, title: 'LearnFlow E-Learning Platform', description: 'A comprehensive e-learning platform with interactive courses, video lessons, progress tracking, and certificate generation.', image: 'https://images.pexels.com/photos/5428832/pexels-photo-5428832.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'], category: 'fullstack', demoUrl: '#', githubUrl: '#', featured: true, color: 'primary' },
  { id: 2, title: 'Student Management System', description: 'Complete student management solution with attendance tracking, grade management, and analytics dashboard.', image: 'https://images.pexels.com/photos/5212702/pexels-photo-5212702.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['React', 'Express', 'PostgreSQL'], category: 'fullstack', demoUrl: '#', githubUrl: '#', featured: true, color: 'secondary' },
  { id: 3, title: 'Portfolio Website', description: 'Modern, responsive portfolio website featuring glassmorphism design, smooth animations, and dark mode.', image: 'https://images.pexels.com/photos/5740715/pexels-photo-5740715.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['React', 'Tailwind CSS', 'Framer Motion'], category: 'frontend', demoUrl: '#', githubUrl: '#', featured: true, color: 'accent' },
  { id: 4, title: 'Weather Dashboard', description: 'Beautiful weather application with real-time data, 7-day forecasts, and stunning visualizations.', image: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['React', 'OpenWeather API'], category: 'frontend', demoUrl: '#', githubUrl: '#', featured: false, color: 'primary' },
  { id: 5, title: 'Task Manager Pro', description: 'Productivity app with task management, reminders, and collaborative features.', image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['React', 'Firebase', 'Redux'], category: 'fullstack', demoUrl: '#', githubUrl: '#', featured: false, color: 'secondary' },
  { id: 6, title: 'E-Commerce Store', description: 'Full-featured online store with product catalog, cart, and checkout.', image: 'https://images.pexels.com/photos/2305445/pexels-photo-2305445.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['React', 'Node.js', 'Stripe'], category: 'fullstack', demoUrl: '#', githubUrl: '#', featured: false, color: 'accent' },
]

const categories = [
  { id: 'all', name: 'All Projects', icon: Globe },
  { id: 'frontend', name: 'Frontend', icon: Palette },
  { id: 'fullstack', name: 'Full Stack', icon: Code2 },
]

function Projects() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredProjects = allProjects.filter(p => p.featured)

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="section-title gradient-text">My Projects</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Explore my work and creative solutions</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-12" />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button key={category.id} onClick={() => setSelectedCategory(category.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCategory === category.id ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-glow' : 'bg-dark-800/60 text-gray-300 hover:bg-dark-700/60 hover:text-white'}`}>
                  <category.icon className="w-4 h-4" />{category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {selectedCategory === 'all' && !searchQuery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }} onClick={() => setSelectedProject(project)} className="card-hover cursor-pointer group overflow-hidden">
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full bg-${project.color}-500/20 border border-${project.color}-500/40 text-xs font-medium text-${project.color}-400`}>Featured</div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">{project.tags.slice(0, 3).map((tag) => (<span key={tag} className="px-2 py-1 text-xs rounded-md bg-dark-700/50 text-gray-300">{tag}</span>))}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" />{selectedCategory === 'all' && !searchQuery ? 'All Projects' : `Results (${filteredProjects.length})`}</h2>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No projects found.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all') }} className="btn-secondary mt-4">Clear Filters</button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -10 }} onClick={() => setSelectedProject(project)} className="card-hover cursor-pointer group overflow-hidden">
                  <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">{project.tags.slice(0, 3).map((tag) => (<span key={tag} className="px-2 py-1 text-xs rounded-md bg-dark-700/50 text-gray-300">{tag}</span>))}</div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm overflow-y-auto">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl bg-dark-800/90 backdrop-blur-xl rounded-2xl border border-dark-700/50 overflow-hidden my-8">
                <div className="relative h-64 md:h-80">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 to-transparent" />
                  <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-900/60 border border-dark-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-all"><X className="w-5 h-5" /></button>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <div className="flex flex-wrap gap-2">{selectedProject.tags.map((tag) => (<span key={tag} className="px-3 py-1 text-xs rounded-full bg-dark-800/80 backdrop-blur-xl text-gray-300">{tag}</span>))}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2"><ExternalLink className="w-4 h-4" />Live Demo</a>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2"><Github className="w-4 h-4" />View Code</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Projects
