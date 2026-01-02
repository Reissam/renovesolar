// Test Supabase Connection
const testSupabaseConnection = async () => {
  console.log('🔍 Testing Supabase connection...')
  
  // Check if environment variables are set
  const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Environment variables not found!')
    console.log('Please create .env.local file with:')
    console.log('VITE_SUPABASE_URL=your_supabase_project_url')
    console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
    return false
  }
  
  console.log('✅ Environment variables found:')
  console.log(`   URL: ${supabaseUrl}`)
  console.log(`   Key: ${supabaseAnonKey.substring(0, 10)}...`)
  
  // Test if URL is valid
  try {
    new URL(supabaseUrl)
    console.log('✅ Supabase URL is valid')
  } catch (error) {
    console.error('❌ Invalid Supabase URL:', error.message)
    return false
  }
  
  // Test if key format looks valid
  if (supabaseAnonKey.startsWith('eyJ')) {
    console.log('✅ Supabase key format looks valid')
  } else {
    console.error('❌ Invalid Supabase key format')
    return false
  }
  
  console.log('🎉 Configuration looks good!')
  console.log('📝 Next steps:')
  console.log('   1. Make sure migration was run in Supabase')
  console.log('   2. Start the dev server: npm run dev')
  console.log('   3. Test the form on the website')
  
  return true
}

// Run test
testSupabaseConnection().then(success => {
  if (success) {
    console.log('✅ Supabase configuration is ready!')
    process.exit(0)
  } else {
    console.log('❌ Please fix the configuration issues above.')
    process.exit(1)
  }
})
