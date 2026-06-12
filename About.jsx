import { motion } from 'framer-motion'
import { Download, MapPin, Calendar, GraduationCap, Briefcase, Code, Heart, BookOpen, Target, Lightbulb, Users } from 'lucide-react'
import { useProfile } from '../App'

const educationTimeline = [
  { year: '2022 - Present', title: 'Bachelor of Computer Applications', institution: 'ABC University', description: 'Currently pursuing with focus on software development and web technologies.', icon: GraduationCap, color: 'primary' },
  { year: '2020 - 2022', title: 'Higher Secondary (12th)', institution: 'XYZ Senior Secondary School', description: 'Completed 12th grade with Computer Science. Scored 90% aggregate.', icon: BookOpen, color: 'secondary' },
  { year: '2018 - 2020', title: 'Secondary School (10th)', institution: 'XYZ High School', description: 'Completed 10th grade with distinction. Started exploring programming.', icon: Target, color: 'accent' },
]

const skills = {
  technical: [
    { name: 'HTML/CSS', level: 90, color: 'primary' },
    { name: 'JavaScript', level: 85, color: 'secondary' },
    { name: 'React.js', level: 80, color: 'accent' },
    { name: 'Tailwind CSS', level: 88, color: 'primary' },
    { name: 'Node.js', level: 70, color: 'secondary' },
    { name: 'TypeScript', level: 75, color: 'accent' },
  ],
  soft: [
    { name: 'Problem Solving', icon: Lightbulb },
    { name: 'Team Collaboration', icon: Users },
    { name: 'Quick Learner', icon: Target },
    { name: 'Communication', icon: Heart },
  ],
}

const interests = [
  { name: 'Web Development', icon: Code, color: 'primary' },
  { name: 'UI/UX Design', icon: Lightbulb, color: 'secondary' },
  { name: 'Open Source', icon: Heart, color: 'accent' },
  { name: 'Learning New Tech', icon: BookOpen, color: 'primary' },
]

function About() {
  const { profile } = useProfile()

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="section-title gradient-text">About Me</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Get to know me better - my journey, skills, and aspirations</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <motion.div whileHover={{ scale: 1.05 }} className="relative mx-auto w-64 h-64 rounded-2xl overflow-hidden">
                <img src={profile?.avatar_url} alt={profile?.full_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
              </motion.div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-white mb-4">Hello! I'm <span className="gradient-text">{profile?.full_name?.split(' ')[0] || 'Shantanu'}</span></h2>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /><span>{profile?.location || 'Delhi, India'}</span></div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-secondary-400" /><span>Available for opportunities</span></div>
                <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-accent-400" /><span>{profile?.role || 'Frontend Developer'}</span></div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{profile?.bio || "I'm a passionate developer with a strong foundation in computer science and a deep love for frontend development. I believe in writing clean, efficient code and creating user interfaces that are not only functional but also delightful to use."}</p>
              <a href="/resume.pdf" download className="btn-primary inline-flex items-center gap-2"><Download className="w-4 h-4" />Download CV</a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Education <span className="gradient-text">Timeline</span></h2>
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 transform md:-translate-x-1/2" />
            {educationTimeline.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div whileHover={{ scale: 1.02 }} className="card-hover">
                    <div className={`inline-flex items-center gap-2 text-${item.color}-400 text-sm mb-2`}><Calendar className="w-4 h-4" />{item.year}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-primary-400 text-sm mb-2">{item.institution}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full bg-${item.color}-500/20 border-2 border-${item.color}-500 flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Technical <span className="gradient-text">Skills</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6">Programming Skills</h3>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className={`text-${skill.color}-400`}>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-700/50 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.1 }} className={`h-full bg-${skill.color}-500 rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-white mb-6">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.soft.map((skill, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }} className="glass-hover p-4 rounded-xl">
                    <skill.icon className="w-6 h-6 text-primary-400 mb-2" />
                    <p className="text-gray-300 font-medium">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"><span className="gradient-text">Interests</span> & Hobbies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="card-hover text-center">
                <div className={`w-14 h-14 mx-auto rounded-xl bg-${interest.color}-500/20 flex items-center justify-center mb-3`}>
                  <interest.icon className={`w-7 h-7 text-${interest.color}-400`} />
                </div>
                <p className="text-white font-medium">{interest.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
