import { useMutation } from '@tanstack/react-query';
import { supabase, type ContactRequest } from '@/lib/supabase';

type ContactRequestInput = Omit<ContactRequest, 'id' | 'created_at' | 'updated_at' | 'status'>;

export const useContactRequest = () => {
  return useMutation({
    mutationFn: async (contactData: ContactRequestInput) => {
      const { data, error } = await supabase
        .from('contact_requests')
        .insert([contactData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
};

