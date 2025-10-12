import { useQuery } from '@tanstack/react-query';
import { supabase, type Vehicle } from '@/lib/supabase';

export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Vehicle[];
    },
  });
};

export const useFeaturedVehicles = () => {
  return useQuery({
    queryKey: ['featured-vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_featured', true)
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      return data as Vehicle[];
    },
  });
};

export const useVehicle = (id: string) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      // Récupérer le véhicule
      const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single();

      if (vehicleError) throw vehicleError;

      // Récupérer les images du véhicule
      const { data: imagesData, error: imagesError } = await supabase
        .from('vehicle_images')
        .select('*')
        .eq('vehicle_id', id)
        .order('display_order', { ascending: true });

      if (imagesError) {
        console.warn('Erreur lors de la récupération des images:', imagesError);
      }

      // Récupérer les vidéos du véhicule
      const { data: videosData, error: videosError } = await supabase
        .from('vehicle_videos')
        .select('*')
        .eq('vehicle_id', id)
        .order('display_order', { ascending: true });

      if (videosError) {
        console.warn('Erreur lors de la récupération des vidéos:', videosError);
      }

      return {
        ...vehicleData,
        vehicle_images: imagesData || [],
        vehicle_videos: videosData || [],
      } as Vehicle;
    },
    enabled: !!id,
  });
};

