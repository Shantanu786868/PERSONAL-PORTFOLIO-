import { motion } from 'framer-motion'
import { Code2, Server, Globe, Briefcase, Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react'

const technicalSkills = [
  { category: 'Frontend', icon: Globe, color: 'primary', skills: [{ name: 'HTML5', level: 95 }, { name: 'CSS3/SCSS', level: 92 }, { name: 'JavaScript', level: 88 }, { name: 'React.js', level: 85 }, { name: 'Tailwind CSS', level: 90 }, { name: 'TypeScript', level: 75 }] },
  { category: 'Backend', icon: Server, color: 'secondary', skills: [{ name: 'Node.js', level: 78 }, { name: 'Python', level: 70 }, { name: 'MongoDB', level: 75 }, { name: 'PostgreSQL', level: 65 }, { name: 'Firebase', level: 72 }, { name: 'REST APIs', level: 80 }] },
  { category: 'Tools', icon: Code2, color: 'accent', skills: [{ name: 'Git/GitHub', level: 85 }, { name: 'VS Code', level: 92 }, { name: 'Figma', level: 75 }, { name: 'Vite', level: 78 }, { name: 'Docker', level: 60 }, { name: 'Linux/CLI', level: 70 }] },
]

const experiences = [
  { title: 'Frontend Developer Intern', company: 'TechCorp Solutions', duration: 'June 2024 - Sept 2024', description: 'Developed responsive web components using React and Tailwind CSS.', achievements: ['Built 5+ reusable UI components', 'Improved page load time by 25%'], color: 'primary' },
  { title: 'Web Development Freelancer', company: 'Self-employed', duration: 'Jan 2024 - Present', description: 'Creating modern, responsive websites for small businesses.', achievements: ['Delivered 10+ client projects', 'Maintained 5-star ratings'], color: 'secondary' },
  { title: 'College Project Lead', company: 'ABC University', duration: 'Sept 2023 - March 2024', description: 'Led a team developing a Student Management System.', achievements: ['Successfully deployed the system', 'Received A+ grade'], color: 'accent' },
]

const certifications = [
  { name: 'Meta Frontend Developer Certificate', issuer: 'Coursera', date: 'May 2024', color: 'primary' },
  { name: 'React - The Complete Guide', issuer: 'Udemy', date: 'March 2024', color: 'secondary' },
  { name: 'JavaScript Algorithms', issuer: 'freeCodeCamp', date: 'Dec 2023', color: 'accent' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', date: 'Aug 2023', color: 'primary' },
]

function Skills() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="section-title gradient-text">Skills & Experience</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">My technical abilities, professional experience, and certifications</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Technical <span className="gradient-text">Skills</span></h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {technicalSkills.map((category, catIndex) => (
              <motion.div key={category.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.1 }} className="card">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-${category.color}-500/20 flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 text-${category.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-200 font-medium">{skill.name}</span>
                        <span className={`text-${category.color}-400 text-sm`}>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-dark-700/50 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.1 }} className={`h-full bg-${category.color}-500 rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Work <span className="gradient-text">Experience</span></h2>
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 transform md:-translate-x-1/2" />
            {experiences.map((exp, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div whileHover={{ scale: 1.02 }} className="card-hover">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <Calendar className={`w-4 h-4 text-${exp.color}-400`} />
                      <span className={`text-${exp.color}-400 text-sm`}>{exp.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className={`text-${exp.color}-400 text-sm mb-3`}>{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                    <div className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className={`flex items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                          <CheckCircle className={`w-4 h-4 text-${exp.color}-400`} />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2">
                  <div className={`w-12 h-12 rounded-full bg-${exp.color}-500/20 border-2 border-${exp.color}-500 flex items-center justify-center`}>
                    <Briefcase className={`w-5 h-5 text-${exp.color}-400`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center"><span className="gradient-text">Certifications</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="card-hover group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full bg-${cert.color}-500`} />
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-${cert.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                    <Award className={`w-5 h-5 text-${cert.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 line-clamp-2">{cert.name}</h3>
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className={`text-${cert.color}-400 text-xs mt-1`}>{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills
