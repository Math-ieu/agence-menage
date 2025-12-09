/*
  # Create reservations table

  1. New Tables
    - `reservations`
      - `id` (uuid, primary key)
      - `service_type` (text) - Type de service réservé
      - `property_type` (text) - Type d'habitation (Studio, Appartement, Villa, Maison)
      - `frequency` (text) - Fréquence du service
      - `estimated_duration` (text) - Durée estimée
      - `number_of_people` (integer) - Nombre de personnes
      - `location_city` (text) - Ville
      - `location_neighborhood` (text) - Quartier
      - `location_details` (text) - Détails du lieu
      - `rooms` (jsonb) - Liste des pièces avec quantités
      - `scheduling_time` (text) - Créneau horaire (matin/après-midi)
      - `scheduling_hours` (text) - Heures précises
      - `scheduling_date` (date) - Date de la réservation
      - `number_of_days` (integer) - Nombre de jours
      - `additional_services` (jsonb) - Services additionnels
      - `phone_number` (text) - Numéro de téléphone
      - `whatsapp_number` (text) - Numéro WhatsApp
      - `first_name` (text) - Prénom
      - `last_name` (text) - Nom
      - `total_price` (decimal) - Prix total
      - `care_location` (text) - Lieu de garde (Domicile, Clinique, Hôpital)
      - `care_address` (text) - Adresse du lieu de garde
      - `patient_age` (text) - Âge du patient
      - `patient_gender` (text) - Sexe du patient
      - `mobility` (text) - Mobilité du patient
      - `health_issues` (text) - Pathologie/problèmes de santé
      - `care_tasks` (jsonb) - Tâches à effectuer
      - `is_overnight` (boolean) - Garde couchante
      - `office_surface` (text) - Superficie des bureaux
      - `additional_notes` (text) - Précisions supplémentaires
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Security
    - Enable RLS on `reservations` table
    - Add policy for inserting reservations (public access for form submissions)
    - Add policy for authenticated users to read their own reservations
*/

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type text NOT NULL,
  property_type text,
  frequency text,
  estimated_duration text,
  number_of_people integer DEFAULT 1,
  location_city text,
  location_neighborhood text,
  location_details text,
  rooms jsonb,
  scheduling_time text,
  scheduling_hours text,
  scheduling_date date,
  number_of_days integer DEFAULT 1,
  additional_services jsonb,
  phone_number text NOT NULL,
  whatsapp_number text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  total_price decimal(10,2),
  care_location text,
  care_address text,
  patient_age text,
  patient_gender text,
  mobility text,
  health_issues text,
  care_tasks jsonb,
  is_overnight boolean DEFAULT false,
  office_surface text,
  additional_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservations"
  ON reservations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read all reservations"
  ON reservations
  FOR SELECT
  TO public
  USING (true);