import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Mail, Calendar, Edit2, Settings, Eye, Heart, MessageSquare, Award, Briefcase, ArrowRight, LogOut, Bell, Shield, Camera, X, Save, Loader2, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useProfile } from '../App'

const dashboardStats = [
  { label: 'Profile Views', value: '1,234', change: '+12%', icon: Eye, color: 'primary' },
  { label: 'Project Likes', value: '567', change: '+8%', icon: Heart, color: 'secondary' },
  { label: 'Messages', value: '45', change: '+23%', icon: MessageSquare, color: 'accent' },
  { label: 'Achievements', value: '12', change: '+2', icon: Award, color: 'primary' },
]

const recentActivity = [
  { action: 'New message from', subject: 'John Doe', time: '2 hours ago', type: 'message' },
  { action: 'Project liked:', subject: 'LearnFlow', time: '5 hours ago', type: 'like' },
  { action: 'Profile viewed by', subject: 'Recruiter', time: '1 day ago', type: 'view' },
  { action: 'Achievement unlocked:', subject: 'Top Contributor', time: '2 days ago', type: 'achievement' },
]

function Dashboard({ user }) {
  const { profile, setProfile, refreshProfile } = useProfile()
  const [showEditor, setShowEditor] = useState(false)
  const [editForm, setEditForm] = useState(profile)
  const [saving, setSaving] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: editForm.full_name,
        role: editForm.role,
        bio: editForm.bio,
        location: editForm.location,
        avatar_url: editForm.avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      setProfile(editForm)
      setShowEditor(false)
    } catch (err) {
      console.error('Error saving profile:', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, <span className="gradient-text">{profile?.full_name?.split(' ')[0] || 'User'}</span>!</h1>
          <p className="text-gray-400">Here's what's happening with your portfolio</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
            <div className="card text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5" />
              <div className="relative z-10">
                <div className="relative inline-block mb-4">
                  <motion.img src={profile?.avatar_url} alt={profile?.full_name} className="w-24 h-24 rounded-full object-cover border-4 border-primary-500/30 shadow-glow" />
                  <button onClick={() => setShowEditor(true)} className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{profile?.full_name || 'Your Name'}</h2>
                <p className="text-primary-400 mb-2">{profile?.role || 'Frontend Developer'}</p>
                <p className="text-gray-400 text-sm mb-6">{profile?.location || 'Delhi, India'}</p>

                <div className="space-y-3">
                  <button onClick={() => setShowEditor(true)} className="btn-primary w-full flex items-center justify-center gap-2">
                    <Edit2 className="w-4 h-4" />Edit Profile
                  </button>
                  <button onClick={handleSignOut} className="btn-secondary w-full flex items-center justify-center gap-2">
                    <LogOut className="w-4 h-4" />Sign Out
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-dark-700/50">
                  <div><p className="text-2xl font-bold text-white">10+</p><p className="text-gray-400 text-xs">Projects</p></div>
                  <div><p className="text-2xl font-bold text-white">5+</p><p className="text-gray-400 text-xs">Skills</p></div>
                  <div><p className="text-2xl font-bold text-white">50+</p><p className="text-gray-400 text-xs">Connections</p></div>
                </div>
              </div>
            </div>

            <div className="card mt-6">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: Settings, label: 'Account Settings', action: () => setShowEditor(true) },
                  { icon: Bell, label: 'Notifications', action: () => {} },
                  { icon: Shield, label: 'Privacy & Security', action: () => {} },
                ].map((item, i) => (
                  <motion.button key={i} onClick={item.action} whileHover={{ x: 5 }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-dark-700/30 text-gray-300 hover:text-white transition-all text-left">
                    <item.icon className="w-5 h-5 text-primary-400" />
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {dashboardStats.map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }} whileHover={{ y: -5 }} className="card-hover">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                      <p className={`text-${stat.color}-400 text-sm mt-1`}>{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Portfolio Analytics</h3>
              </div>
              <div className="flex items-end justify-between h-48 gap-4 px-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const heights = [60, 80, 45, 90, 70, 50, 85]
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div initial={{ height: 0 }} animate={{ height: `${heights[i]}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }} className="w-full rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400" />
                      <span className="text-gray-500 text-xs">{day}</span>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
              <h3 className="text-white font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-dark-700/30 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'message' ? 'bg-primary-500/20' : activity.type === 'like' ? 'bg-red-500/20' : activity.type === 'view' ? 'bg-secondary-500/20' : 'bg-accent-500/20'}`}>
                      {activity.type === 'message' && <MessageSquare className="w-5 h-5 text-primary-400" />}
                      {activity.type === 'like' && <Heart className="w-5 h-5 text-red-400" />}
                      {activity.type === 'view' && <Eye className="w-5 h-5 text-secondary-400" />}
                      {activity.type === 'achievement' && <Award className="w-5 h-5 text-accent-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-300">{activity.action} <span className="text-white font-medium">{activity.subject}</span></p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showEditor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-full max-w-lg bg-dark-800/90 backdrop-blur-2xl rounded-2xl border border-dark-700/50 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-dark-700/50">
                <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                <button onClick={() => setShowEditor(false)} className="w-10 h-10 rounded-xl hover:bg-dark-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                  <input type="text" value={editForm?.full_name || ''} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Role / Title</label>
                  <input type="text" value={editForm?.role || ''} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Location</label>
                  <input type="text" value={editForm?.location || ''} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Bio</label>
                  <textarea value={editForm?.bio || ''} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} rows={3} className="input-field resize-none" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Avatar URL</label>
                  <input type="text" value={editForm?.avatar_url || ''} onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })} className="input-field" placeholder="https://..." />
                  <p className="text-gray-500 text-xs mt-1">Paste an image URL for your avatar</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowEditor(false)} className="flex-1 py-3 px-4 rounded-xl bg-dark-700/50 text-gray-300 hover:bg-dark-700 transition-colors">Cancel</button>
                  <button onClick={handleSaveProfile} disabled={saving} className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium hover:shadow-glow disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Changes</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard
