import { supabase } from './supabase-client.js'

export async function signUp(email, password, displayName, schedule) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName }
    }
  })
  if (error) throw error

  if (data.user) {
    await supabase.from('prettyboy_profiles').upsert({
      id: data.user.id,
      display_name: displayName,
      email,
      schedule: schedule || ['monday', 'tuesday', 'thursday', 'friday']
    })
  }

  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}
