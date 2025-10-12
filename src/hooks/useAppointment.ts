import { useMutation } from '@tanstack/react-query';
import { supabase, type Appointment } from '@/lib/supabase';

type AppointmentInput = Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'status'>;

export const useAppointment = () => {
  return useMutation({
    mutationFn: async (appointmentData: AppointmentInput) => {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
};

