-- Create profiles table for pharmacist information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  license_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacist_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  contact TEXT,
  aadhaar_number TEXT UNIQUE,
  medical_history TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create vaccinations table with follow-up tracking
CREATE TABLE public.vaccinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  pharmacist_id UUID NOT NULL,
  vaccine_name TEXT NOT NULL,
  dose_number INTEGER DEFAULT 1,
  administered_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  next_dose_due TIMESTAMP WITH TIME ZONE,
  follow_up_type TEXT CHECK (follow_up_type IN ('1_week', '1_month', 'completed')),
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'follow_up_due', 'missed')),
  batch_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ADR reports table
CREATE TABLE public.adr_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vaccination_id UUID REFERENCES public.vaccinations(id) ON DELETE SET NULL,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  pharmacist_id UUID NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('mild', 'moderate', 'severe', 'anaphylaxis')),
  symptoms TEXT NOT NULL,
  onset_time TIMESTAMP WITH TIME ZONE,
  action_taken TEXT,
  outcome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adr_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Patients policies
CREATE POLICY "Pharmacists can view their own patients"
  ON public.patients FOR SELECT
  USING (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can create patients"
  ON public.patients FOR INSERT
  WITH CHECK (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can update their own patients"
  ON public.patients FOR UPDATE
  USING (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can delete their own patients"
  ON public.patients FOR DELETE
  USING (auth.uid() = pharmacist_id);

-- Vaccinations policies
CREATE POLICY "Pharmacists can view their own vaccinations"
  ON public.vaccinations FOR SELECT
  USING (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can create vaccinations"
  ON public.vaccinations FOR INSERT
  WITH CHECK (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can update their own vaccinations"
  ON public.vaccinations FOR UPDATE
  USING (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can delete their own vaccinations"
  ON public.vaccinations FOR DELETE
  USING (auth.uid() = pharmacist_id);

-- ADR reports policies
CREATE POLICY "Pharmacists can view their own ADR reports"
  ON public.adr_reports FOR SELECT
  USING (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can create ADR reports"
  ON public.adr_reports FOR INSERT
  WITH CHECK (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can update their own ADR reports"
  ON public.adr_reports FOR UPDATE
  USING (auth.uid() = pharmacist_id);

CREATE POLICY "Pharmacists can delete their own ADR reports"
  ON public.adr_reports FOR DELETE
  USING (auth.uid() = pharmacist_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
  BEFORE UPDATE ON public.patients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vaccinations_updated_at
  BEFORE UPDATE ON public.vaccinations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_adr_reports_updated_at
  BEFORE UPDATE ON public.adr_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();