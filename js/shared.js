import { supabase } from './supabase-client.js'

// ── Require Auth ──
export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    window.location.href = 'index.html'
    return null
  }
  return session
}

// ── Get Profile ──
export async function getProfile() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data } = await supabase
    .from('prettyboy_profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return data
}

// ── Toast Notifications ──
export function showToast(message, type = 'success', duration = 3000) {
  const existing = document.querySelector('.toast')
  if (existing) existing.remove()

  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.textContent = message
  document.body.appendChild(toast)

  requestAnimationFrame(() => toast.classList.add('show'))

  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 300)
  }, duration)
}
