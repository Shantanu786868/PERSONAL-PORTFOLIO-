import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, X, Save, Loader2, Check, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

function ProfileEditor({ user, onClose, onSave }) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState({
    full_name: '',
    avatar_url: '',
    role: 'Frontend Developer',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
  })
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile({
          full_name: data.full_name || user.user_metadata?.full_name || '',
          avatar_url: data.avatar_url || '',
          role: data.role || 'Frontend Developer',
          bio: data.bio || '',
          location: data.location || '',
          website: data.website || '',
          linkedin: data.linkedin || '',
          github: data.github || '',
        })
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath)

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }))
    } catch (err) {
      setError('Failed to upload image. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          role: profile.role,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          linkedin: profile.linkedin,
          github: profile.github,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        onSave(profile)
        onClose()
      }, 1500)
    } catch (err) {
      setError('Failed to save profile. Please try again.')
      console.error('Save error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg bg-dark-800/90 backdrop-blur-2xl rounded-3xl border border-dark-700/50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-700/50">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-dark-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary-500/30"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border-4 border-primary-500/30 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <label className="absolute inset-0 flex items-center justify-center bg-dark-900/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                {uploading ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <Upload className="w-6 h-6 text-white" />
                )}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="mt-4 text-sm text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Change Photo'}
            </button>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Your name"
              className="input-field"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Role / Title</label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
              placeholder="Frontend Developer"
              className="input-field"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, Country"
              className="input-field"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Website</label>
            <input
              type="url"
              value={profile.website}
              onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://yoursite.com"
              className="input-field"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-2">LinkedIn</label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-2">GitHub</label>
              <input
                type="text"
                value={profile.github}
                onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
                placeholder="https://github.com/..."
                className="input-field"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
            >
              <Check className="w-4 h-4 flex-shrink-0" />
              Profile saved successfully!
            </motion.div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-dark-700/50 text-gray-300 hover:bg-dark-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-primary text-white font-medium hover:shadow-glow disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ProfileEditor
