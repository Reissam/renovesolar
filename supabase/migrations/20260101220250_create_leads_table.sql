/*
  # Create Leads Table for Renove Solar

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, customer name)
      - `email` (text, customer email)
      - `phone` (text, customer phone/WhatsApp)
      - `consumption` (numeric, average monthly consumption in kWh)
      - `property_type` (text, residential/commercial/rural)
      - `city` (text, city location)
      - `state` (text, state/province)
      - `best_contact_time` (text, preferred contact time)
      - `lead_source` (text, which form/page generated the lead)
      - `status` (text, lead status: new/contacted/qualified/lost)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `leads` table
    - Add policies for anonymous users to insert
    - Add policies for authenticated service role to read/update
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  consumption numeric,
  property_type text DEFAULT 'residential',
  city text,
  state text,
  best_contact_time text DEFAULT 'morning',
  lead_source text DEFAULT 'website',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to update all"
  ON leads
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
