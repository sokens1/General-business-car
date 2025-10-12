import { useQuery } from '@tanstack/react-query';
import { supabase, type Service } from '@/lib/supabase';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });
};

