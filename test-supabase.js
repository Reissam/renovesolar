import { supabase } from './src/lib/supabase.js'

// Test Supabase Connection
async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...')
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    
    // Test insert permission
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
      return false
    }
    
    console.log('✅ Insert permission working!')
    
    // Clean up test data
    const { error: deleteError } = await supabase
      .from('leads')
      .delete()
      .eq('email', 'test@example.com')
    
    if (deleteError) {
      console.warn('⚠️  Could not clean up test data:', deleteError.message)
    } else {
      console.log('✅ Test data cleaned up!')
    }
    
    return true
    
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    return false
  }
}

// Run test
testSupabaseConnection().then(success => {
  if (success) {
    console.log('🎉 All tests passed! Supabase is ready for use.')
    process.exit(0)
  } else {
    console.log('💥 Tests failed! Please check your configuration.')
    process.exit(1)
  }
})
