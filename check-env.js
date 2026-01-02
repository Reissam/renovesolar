// Simple environment test
console.log('🔍 Checking environment variables...')

// Load environment variables from .env.local
import { config } from 'dotenv'
config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

console.log('Environment variables:')
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Found' : '❌ Missing')
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Found' : '❌ Missing')

if (supabaseUrl && supabaseAnonKey) {
  console.log('\n📋 Configuration:')
  console.log('URL:', supabaseUrl)
  console.log('Key length:', supabaseAnonKey.length)
  console.log('Key starts with:', supabaseAnonKey.substring(0, 20) + '...')
  
  // Check key format
  if (supabaseAnonKey.startsWith('eyJ')) {
    console.log('✅ Key format looks correct (JWT token)')
  } else if (supabaseAnonKey.startsWith('sb_')) {
    console.log('⚠️  This looks like a service_role key, not anon key')
    console.log('   Please use the "anon public" key from Supabase dashboard')
  } else {
    console.log('❌ Key format looks incorrect')
    console.log('   Supabase anon keys should start with "eyJ"')
  }
  
  // Check URL format
  try {
    new URL(supabaseUrl)
    console.log('✅ URL format is valid')
  } catch (error) {
    console.log('❌ URL format is invalid:', error.message)
  }
} else {
  console.log('\n❌ Missing environment variables!')
  console.log('Please create .env.local file with:')
  console.log('VITE_SUPABASE_URL=your_supabase_project_url')
  console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
}
