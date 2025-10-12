import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export type VehicleImage = {
  id: string;
  vehicle_id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  created_at: string;
};

export type VehicleVideo = {
  id: string;
  vehicle_id: string;
  video_url: string;
  video_type: 'youtube' | 'vimeo' | 'direct';
  thumbnail_url?: string;
  title: string;
  description?: string;
  duration?: number;
  display_order: number;
  created_at: string;
};

export type Vehicle = {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  image_url: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  power: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
  updated_at: string;
  vehicle_images?: VehicleImage[];
  vehicle_videos?: VehicleVideo[];
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  vehicle_id?: string;
  request_type: 'contact' | 'test_drive' | 'quote' | 'financing';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
};

export type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  vehicle_id?: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
};

