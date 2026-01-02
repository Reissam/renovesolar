// Real Supabase Connection Test
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

async function testRealConnection() {
  console.log('🔍 Testing real Supabase connection...')
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing environment variables')
    return false
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  try {
    // Test 1: Basic connection - check if table exists
    console.log('📋 Test 1: Checking if leads table exists...')
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('❌ Table "leads" does not exist')
        console.log('💡 Please run the migration script first:')
        console.log('   1. Go to Supabase dashboard > SQL Editor')
        console.log('   2. Copy contents from: supabase/migrations/20260101220250_create_leads_table.sql')
        console.log('   3. Paste and run the script')
        return false
      } else {
        console.error('❌ Connection error:', error.message)
        return false
      }
    }
    
    console.log('✅ Leads table exists and is accessible')
    
    // Test 2: Test insert permission
    console.log('📝 Test 2: Testing insert permission...')
    const testLead = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '(11) 99999-9999',
      consumption: 500,
      property_type: 'residential',
      city: 'São Paulo',
      state: 'SP',
      best_contact_time: 'morning',
      lead_source: 'test',
      status: 'test'
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('leads')
      .insert([testLead])
      .select()
    
    if (insertError) {
      console.error('❌ Insert permission failed:', insertError.message)
      console.log('💡 Check RLS policies in Supabase dashboard')
      return false
    }
    
    console.log('✅ Insert permission working!')
    console.log('📄 Test record inserted:', insertData[0].id)
    
    // Test 3: Clean up test data
    console.log('🧹 Test 3: Cleaning up test data...')
    const { error: deleteError } = await supabase
      .from('leads')
      .delete()
      .eq('email', 'test@example.com')
    
    if (deleteError) {
      console.warn('⚠️  Could not clean up test data:', deleteError.message)
    } else {
      console.log('✅ Test data cleaned up successfully')
    }
    
    console.log('🎉 All tests passed!')
    console.log('🚀 Supabase is ready for use!')
    return true
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
    return false
  }
}

// Run test
testRealConnection().then(success => {
  if (success) {
    console.log('\n✅ Supabase connection is fully functional!')
    console.log('📝 You can now:')
    console.log('   • Start the dev server: npm run dev')
    console.log('   • Test the form on the website')
    console.log('   • Check leads in Supabase dashboard')
    process.exit(0)
  } else {
    console.log('\n❌ Please fix the issues above before proceeding')
    process.exit(1)
  }
})
