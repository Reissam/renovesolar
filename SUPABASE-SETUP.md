# Supabase Setup Guide

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up/login with GitHub
4. Create new project:
   - **Organization**: Renove Solar
   - **Project Name**: renove-solar-website
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users (South America)

### 2. Get Configuration Values
1. In your Supabase dashboard, go to **Project Settings** ⚙️
2. Click on **API** in the sidebar
3. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public**: `eyJ...` (long string)

### 3. Configure Environment
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJyour-anon-key-here
   ```

### 4. Run Database Migration
1. In Supabase dashboard, go to **SQL Editor** 📝
2. Click **New query**
3. Copy the entire content from:
   `supabase/migrations/20260101220250_create_leads_table.sql`
4. Paste and click **Run** ▶️

### 5. Test Integration
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open the website
3. Fill out the "Orçamento Grátis" form
4. Check if data appears in Supabase:
   - Go to **Table Editor** 📊
   - Select `leads` table
   - You should see the submitted lead

## 📊 Database Schema

The `leads` table contains:
- `id`: Unique identifier
- `name`: Customer name
- `email`: Customer email  
- `phone`: WhatsApp/phone
- `consumption`: Monthly kWh consumption
- `property_type`: residential/commercial/rural
- `city`: Customer city
- `state`: Customer state
- `best_contact_time`: morning/afternoon/evening
- `lead_source`: website_form
- `status`: new/contacted/qualified/lost
- `created_at`: When lead was submitted
- `updated_at`: Last update time

## 🔒 Security

- **RLS Enabled**: Row Level Security active
- **Anonymous Insert**: Anyone can submit forms
- **Service Role**: Full access for admin functions
- **No Public Data**: Leads are private by default

## 🚨 Troubleshooting

### "Invalid URL" Error
- Check if `VITE_SUPABASE_URL` is correct
- Ensure it starts with `https://`
- Verify no typos in the URL

### "Invalid API Key" Error  
- Confirm `VITE_SUPABASE_ANON_KEY` is correct
- Use the `anon` key, not `service_role` key
- Check for extra spaces or quotes

### Form Not Submitting
- Open browser dev tools (F12)
- Check Console tab for errors
- Verify network requests to Supabase

### No Data in Table
- Check if migration was run
- Verify RLS policies are correct
- Ensure form data matches table schema

## 📞 Support

If you need help:
1. Check [Supabase Docs](https://supabase.com/docs)
2. Review error messages in browser console
3. Verify all configuration steps were completed

---

**✅ Your Renove Solar website is ready to collect leads!**
